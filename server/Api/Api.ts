import path from 'path';
import axios from 'axios';
import { Application, Request, Response } from 'express';
import fs from 'fs';
import {CLIENT_BUILD_DIRECTORY, SERVER_STATIC_FILES_DIRECTORY} from '../common/constants';
import Database from '../database/Database';
import {IApiResponse, IUser} from '../common/types';
const jwt = require('jsonwebtoken');

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
		app.post('/login', Api.handleLoginRequest);
		app.get('/authenticate', Api.handleAuthenticateRequest);
		app.post('/register', Api.handleRegisterRequest);
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
				users: Api.extractUserNames(await Database.getUsers()),
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

	private static async handleLoginRequest(req: Request, res: Response): Promise<void> {
		try {
			let response;
			const {login, password} = req.body;

			/*if (login !== 'user' || password !== '1111') {
				response = {
					status: false,
					message: 'Incorrect login or password!',
				};
				res.status(200).json(response);
			}*/

			const user = {name: login};
			const secret = 'secret';
			const expiration = {'expiresIn': '1m'};
			const token = await jwt.sign(user, secret, expiration);

			response = {
				token: token,
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	private static async handleAuthenticateRequest(req: Request, res: Response): Promise<void> {
		try {
			console.log(req.headers['auth-token']);

			const response = {
				success: true,
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	private static async handleRegisterRequest(req: Request, res: Response): Promise<void> {
		try {
			const {login, password} = req.body;
			const response = {
				userExists: false,
				users: {},
			};

			const userExists = await Database.findUser(login);

			if (userExists) {
				response.userExists = true;
				Api.sendSuccess(res, response);
			} else {
				await Database.saveUser(login, password);
				response.users = Api.extractUserNames(await Database.getUsers());
				Api.sendSuccess(res, response);
			}
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

	private static extractUserNames(users: IUser[]): string[] {
		return users.map((user) => user.login);
	}
}
