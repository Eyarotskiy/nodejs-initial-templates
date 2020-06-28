import path from 'path';
import { Application, Request, Response } from 'express';
import { APP_DIRECTORY } from '../globals/constants';
import {IMenu} from "../globals/types";
import Database from "../database/Database";

export default class Api {
	static initApiRequests(app: Application) {
		app.get('/api/customers', Api.handleCustomersRequest);
		app.post('/api/menu/save', Api.handleMenuSaveRequest);
		app.get('/*', Api.handleRootRequest);
	}

	private static async handleMenuSaveRequest(req: Request, res:Response) {
		try {
			const menu: IMenu = {name: 'Orlov1'};

			await Database.saveMenu(menu);
			res.send('menu saved successfully1!');
		} catch (error) {
			console.log(error);
		}
	}

	private static async handleRootRequest(req: Request, res:Response) {
		try {
			res.sendFile(path.join(APP_DIRECTORY, '../../client/build', 'index.html'));
		} catch (error) {
			console.log(error);
		}
	}

	private static async handleCustomersRequest(req: Request, res:Response) {
		try {
			const customers = [
				{id: 1, firstName: 'John', lastName: 'Doe'},
				{id: 3, firstName: 'Mary1', lastName: 'Swanson'},
			];

			res.json(customers);
		} catch (error) {
			console.log(error);
		}
	}
}
