import path from 'path';
import { Application, Request, Response } from 'express';
import { CLIENT_BUILD_DIRECTORY } from '../globals/constants';
import Database from "../database/Database";

export default class Api {
	static initApiRequests(app: Application) {
		app.get('/api/menu/get', Api.handleMenuGetRequest);
		app.post('/api/dish/save', Api.handleDishSaveRequest);
		app.post('/api/dish/update', Api.handleDishUpdateRequest);
		app.post('/api/dish/delete', Api.handleDishDeleteRequest);
		app.get('/*', Api.handleRootRequest);
	}

	private static async handleDishSaveRequest(req: Request, res:Response) {
		try {
			const {dishName} = req.body;

			const savedDish = await Database.saveDish(dishName);
			res.send(savedDish);
		} catch (error) {
			console.log(error);
		}
	}

	private static async handleDishUpdateRequest(req: Request, res:Response) {
		try {
			const {oldDishName} = req.body;
			const {newDishName} = req.body;
			const updatedDish = await Database.updateDish(oldDishName, newDishName);
			res.send({data: updatedDish})
		} catch (error) {
			console.log(error);
		}
	}

	private static async handleDishDeleteRequest(req: Request, res:Response) {
		try {
			const {dishName} = req.body;
			const deletedDish = await Database.deleteDish(dishName);
			res.send(deletedDish)
		} catch (error) {
			console.log(error);
		}
	}

	private static async handleMenuGetRequest(req: Request, res:Response) {
		try {
			const menu = await Database.getMenu();

			res.json(menu);
		} catch (error) {
			console.log(error);
			res.status(400).send('error');
		}
	}

	private static async handleRootRequest(req: Request, res:Response) {
		try {
			res.sendFile(path.join(CLIENT_BUILD_DIRECTORY, 'index.html'));
		} catch (error) {
			console.log(error);
			res.status(400).send('error');
		}
	}
}
