import path from 'path';
import { Application, Request, Response } from 'express';
import {CLIENT_BUILD_DIRECTORY, SERVER_STATIC_FILES_DIRECTORY} from '../common/constants';
import Database from "../database/Database";
import {IApiResponse} from "../common/types";
import fs from 'fs';

export default class API {
	static initApiRequests(app: Application) {
		app.get('/api/menu/get', API.handleMenuGetRequest);
		app.post('/api/dish/save', API.handleDishSaveRequest);
		app.post('/api/dish/update', API.handleDishUpdateRequest);
		app.post('/api/dish/delete', API.handleDishDeleteRequest);
		app.post('/api/menu/clear', API.handleMenuClearRequest);
		app.post('/file/upload', API.handleFileUploadRequest);
		app.get('/*', API.handleRootRequest);
	}

	private static async handleDishSaveRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const savedDish = await Database.saveDish(dishName);
			API.sendSuccess(res, savedDish);
		} catch (error) {
			API.sendError(res, 400, error)
		}
	}

	private static async handleDishUpdateRequest(req: Request, res:Response): Promise<void> {
		try {
			const {oldDishName, newDishName} = req.body;
			const updatedDish = await Database.updateDish(oldDishName, newDishName);
			API.sendSuccess(res, updatedDish);
		} catch (error) {
			API.sendError(res, 400, error);
		}
	}

	private static async handleDishDeleteRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const deletedDish = await Database.deleteDish(dishName);
			API.sendSuccess(res, deletedDish);
		} catch (error) {
			API.sendError(res, 400, error);
		}
	}

	private static async handleMenuClearRequest(req: Request, res:Response): Promise<void> {
		try {
			const result = await Database.clearMenu();
			API.sendSuccess(res, result);
		} catch (error) {
			API.sendError(res, 400, error);
		}
	}

	private static async handleMenuGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const menu = await Database.getMenu();
			API.sendSuccess(res, menu);
		} catch (error) {
			API.sendError(res, 400, error);
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
			API.sendSuccess(res, result);
		} catch (error) {
			API.sendError(res, 500, error);
		}
	}

	private static async handleRootRequest(req: Request, res:Response): Promise<void> {
		try {
			res.sendFile(path.join(CLIENT_BUILD_DIRECTORY, 'index.html'));
		} catch (error) {
			API.sendError(res, 400, error);
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
}
