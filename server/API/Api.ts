import path from 'path';
import { Application, Request, Response } from 'express';
import { CLIENT_BUILD_DIRECTORY, SuccessMessage } from '../common/constants';
import Database from "../database/Database";
import {IApiResponse} from "../common/types";

export default class Api {
	static initApiRequests(app: Application) {
		app.get('/api/menu/get', Api.handleMenuGetRequest);
		app.post('/api/dish/save', Api.handleDishSaveRequest);
		app.post('/api/dish/update', Api.handleDishUpdateRequest);
		app.post('/api/dish/delete', Api.handleDishDeleteRequest);
		app.post('/api/menu/clear', Api.handleMenuClearRequest);
		app.get('/*', Api.handleRootRequest);
	}

	private static async handleDishSaveRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const savedDish = await Database.saveDish(dishName);
			Api.sendSuccess(res, SuccessMessage.DISH_SAVE, savedDish);
		} catch (error) {
			Api.sendError(res, 400, error)
		}
	}

	private static async handleDishUpdateRequest(req: Request, res:Response): Promise<void> {
		try {
			const {oldDishName, newDishName} = req.body;
			const updatedDish = await Database.updateDish(oldDishName, newDishName);
			Api.sendSuccess(res, SuccessMessage.DISH_UPDATE, updatedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleDishDeleteRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const deletedDish = await Database.deleteDish(dishName);
			Api.sendSuccess(res, SuccessMessage.DISH_REMOVE, deletedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleMenuClearRequest(req: Request, res:Response): Promise<void> {
		try {
			const result = await Database.clearMenu();
			Api.sendSuccess(res, SuccessMessage.MENU_CLEAR, result);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleMenuGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const menu = await Database.getMenu();
			res.json(menu);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	private static async handleRootRequest(req: Request, res:Response): Promise<void> {
		try {
			res.sendFile(path.join(CLIENT_BUILD_DIRECTORY, 'index.html'));
		} catch (error) {
			console.log(error);
			res.status(400).send('error');
		}
	}

	private static sendSuccess(res: Response, message: string, data: object|null = {}): void {
		const code = 200;
		const response: IApiResponse = {code, message, data};

		res.status(code).send(response);
	}

	private static sendError(res: Response, code: number, message: string): void {
		const response: IApiResponse = {code, message};

		res.status(code).send(response);
	}
}
