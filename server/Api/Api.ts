import path from 'path';
import {Application, NextFunction, Request, Response} from 'express';
import {CLIENT_BUILD_DIRECTORY, JWT_SECRET, SERVER_STATIC_FILES_DIRECTORY} from '../common/constants';
import {ApiResponse} from '../common/types';
import DataApi from './DataApi/DataApi';
import FileApi from './FileApi/FileApi';
import AuthorizationApi from './AuthorizationApi/AuthorizationApi';
import MenuApi from './MenuApi/MenuApi';
import Log from '../Log/Log';
const jwt = require('jsonwebtoken');

export default class Api {
	static initApiRequests(app: Application) {
		app.get('/api/menu/get', MenuApi.handleMenuGetRequest);
		app.post('/api/dish/save', MenuApi.handleDishSaveRequest);
		app.post('/api/dish/update', MenuApi.handleDishUpdateRequest);
		app.post('/api/dish/delete', MenuApi.handleDishDeleteRequest);
		app.post('/api/menu/clear', MenuApi.handleMenuClearRequest);
		app.get('/api/data/get', DataApi.handleDataGetRequest);
		app.get('/api/users/get', DataApi.handleUsersGetRequest);
		app.post('/api/file/upload', FileApi.handleFileUploadRequest);
		app.post('/api/login/signIn', AuthorizationApi.handleSignInRequest);
		app.get('/api/login/authenticate', AuthorizationApi.handleAuthenticateRequest);
		app.post('/api/login/signUp', AuthorizationApi.handleSignUpRequest);
		app.get('/*', Api.handleRootRequest);
	}

	private static async handleRootRequest(req: Request, res:Response): Promise<void> {
		try {
			res.sendFile(path.join(CLIENT_BUILD_DIRECTORY, 'index.html'));
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	static sendSuccess(res: Response, data: object|null = {}): void {
		res.status(200).json(data);
	}

	static async sendError(res: Response, code: number, error: any) {
		const response: ApiResponse = {
			code,
			message: error.message,
			stack: error.stack,
		};

		await Log.logErrorToFile(response);
		res.status(code).send(response);
	}

	static applyRootRequestMiddleware(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const exceptionUrls = [
			'/',
			'/api/login/signIn',
			'/api/login/signUp',
			'/api/users/get',
		];
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
