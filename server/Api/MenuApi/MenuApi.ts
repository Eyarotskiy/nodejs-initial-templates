import {Request, Response} from 'express';
import Database from '../../database/Database';
import Api from '../Api';

export default class MenuApi {
	static async handleDishSaveRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const savedDish = await Database.saveDish(dishName);
			Api.sendSuccess(res, savedDish);
		} catch (error) {
			Api.sendError(res, 400, error)
		}
	}

	static async handleDishUpdateRequest(req: Request, res:Response): Promise<void> {
		try {
			const {oldDishName, newDishName} = req.body;
			const updatedDish = await Database.updateDish(oldDishName, newDishName);
			Api.sendSuccess(res, updatedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	static async handleDishDeleteRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const deletedDish = await Database.deleteDish(dishName);
			Api.sendSuccess(res, deletedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	static async handleMenuClearRequest(req: Request, res:Response): Promise<void> {
		try {
			const result = await Database.clearMenu();
			Api.sendSuccess(res, result);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	static async handleMenuGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const menu = await Database.getMenu();
			Api.sendSuccess(res, menu);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}
}
