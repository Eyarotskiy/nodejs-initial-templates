import mongoose from 'mongoose';
import { model } from './model';
import { MONGO_URI } from '../globals/constants';
import { IMenu } from '../globals/types';

export default class Database {
	static async connect() {
		try {
			await mongoose.connect(MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log('Connection to database established!');
		} catch (error) {
			console.log('Connection to database failed! Error log:');
			console.log(error);
		}
	}

	static async saveMenu(menu: IMenu) {
		let menuModel = new model.menu();

		await Database.save(menuModel, menu, 'menu');
	}

	private static async save(model: any, data: object, label: string) {
		try {
			model = Database.copyObjectParams(model, data);
			await model.save();
			console.log(`${label} saved successfully!`);
		} catch (error) {
			console.log(`Couldn't save menu:`);
			console.log(error);
		}
	}

	private static copyObjectParams(obj1: any, obj2: any) {
		for (const param of Object.keys(obj2)) {
			obj1[param] = obj2[param];
		}
		return obj1;
	}
}
