import path from 'path';
import axios from 'axios';
import {Application, NextFunction, Request, Response} from 'express';
import fs from 'fs';
import {CLIENT_BUILD_DIRECTORY, JWT_SECRET, SERVER_STATIC_FILES_DIRECTORY} from '../common/constants';
import Database from '../database/Database';
import {IApiResponse, IUserSignInResponse, IUserSignUpResponse} from '../common/types';
import {extractUserNames} from '../common/utils';
import Email from '../Email/Email';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export default class Api {
	static initApiRequests(app: Application) {
		app.get('/api/menu/get', Api.handleMenuGetRequest);
		app.post('/api/dish/save', Api.handleDishSaveRequest);
		app.post('/api/dish/update', Api.handleDishUpdateRequest);
		app.post('/api/dish/delete', Api.handleDishDeleteRequest);
		app.post('/api/menu/clear', Api.handleMenuClearRequest);
		app.get('/api/data/get', Api.handleDataGetRequest);
		app.get('/api/users/get', Api.handleUsersGetRequest);
		app.post('/file/upload', Api.handleFileUploadRequest);
		app.post('/signIn', Api.handleSignInRequest);
		app.get('/authenticate', Api.handleAuthenticateRequest);
		app.post('/signUp', Api.handleSignUpRequest);
		app.get('/*', Api.handleRootRequest);
	}

	private static async handleDishSaveRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const savedDish = await Database.saveDish(dishName);
			Api.sendSuccess(res, savedDish);
		} catch (error) {
			Api.sendError(res, 400, error)
		}
	}

	private static async handleDishUpdateRequest(req: Request, res:Response): Promise<void> {
		try {
			const {oldDishName, newDishName} = req.body;
			const updatedDish = await Database.updateDish(oldDishName, newDishName);
			Api.sendSuccess(res, updatedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleDishDeleteRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const deletedDish = await Database.deleteDish(dishName);
			Api.sendSuccess(res, deletedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleMenuClearRequest(req: Request, res:Response): Promise<void> {
		try {
			const result = await Database.clearMenu();
			Api.sendSuccess(res, result);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleMenuGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const menu = await Database.getMenu();
			Api.sendSuccess(res, menu);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleDataGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/users');
			Api.sendSuccess(res, response.data);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleUsersGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const response = {
				users: extractUserNames(await Database.getUsers()),
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleFileUploadRequest(req: any, res:Response): Promise<void> {
		try {
			if (!fs.existsSync(SERVER_STATIC_FILES_DIRECTORY)) {
				fs.mkdirSync(SERVER_STATIC_FILES_DIRECTORY);
			}
			const {file} = req.files;
			const destinationPath = path.join(SERVER_STATIC_FILES_DIRECTORY, '/', file.name);
			await file.mv(destinationPath);
			const result = {
				url: `${req.protocol}://${req.get('host')}/${file.name}`,
			};
			Api.sendSuccess(res, result);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	private static async handleSignInRequest(req: Request, res: Response): Promise<void> {
		try {
			const {login, password} = req.body;
			const user = await Database.findUser(login);
			const isPasswordCorrect =
				user ? await bcrypt.compare(password, user.password) : false;
			const token =
				user && isPasswordCorrect ?  await Api.generateToken(login) : null;

			if (!user) {
				Api.sendError(res, 404, {message: 'Such user does not exist'});
				return;
			}

			if (!isPasswordCorrect) {
				Api.sendError(res, 401, {message: 'Password is not correct'});
				return;
			}

			const response: IUserSignInResponse = {
				token: token,
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	private static async handleAuthenticateRequest(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers['auth-token'];
			const verification = await jwt.verify(token, JWT_SECRET);
			const user = await Database.findUser(verification.name);
			const newToken = await Api.generateToken(verification.name);
			await Database.confirmUser(user.login);

			const response = {
				login: user.login,
				newToken: newToken,
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	private static async handleSignUpRequest(req: Request, res: Response): Promise<void> {
		try {
			const {login, password} = req.body;
			const saltRounds = 10;
			const hash = await bcrypt.hash(password, saltRounds);
			const user = await Database.findUser(login);

			if (user) {
				Api.sendError(res, 403, {message: 'User already exists'});
				return;
			}

			await Email.sendConfirmationEmail(login);
			await Database.saveUser(login, hash);

			const response: IUserSignUpResponse = {
				users: extractUserNames(await Database.getUsers()),
			};

			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	private static async handleRootRequest(req: Request, res:Response): Promise<void> {
		try {
			res.sendFile(path.join(CLIENT_BUILD_DIRECTORY, 'index.html'));
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static sendSuccess(res: Response, data: object|null = {}): void {
		res.status(200).json(data);
	}

	private static sendError(res: Response, code: number, error: any): void {
		const response: IApiResponse = {
			code,
			message: error.message,
			stack: error.stack,
		};

		res.status(code).send(response);
	}

	static applyRootRequestMiddleware(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const exceptionUrls = ['/', '/signIn', '/signUp', '/api/users/get'];
		const shouldPass = exceptionUrls.some((url) => req.url === url);

		if (shouldPass) {
			next();
		} else {
			Api.authenticateToken(req, res, next);
		}
	}

	static authenticateToken(req: Request, res: Response, next: NextFunction) {
		const token = req.headers['auth-token'];

		const handleVerification = (err: any, user: any) => {
			if (err) {
				Api.sendError(res, 401, err);
				return;
			}
			next();
		};

		jwt.verify(token, JWT_SECRET, handleVerification);
	}

	static generateToken(userName: string) {
		const name = {name: userName};
		const expiration = {'expiresIn': '1d'};
		return jwt.sign(name, JWT_SECRET, expiration);
	}
}
