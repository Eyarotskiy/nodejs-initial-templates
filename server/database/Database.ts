import mongoose, {Document} from 'mongoose';
import { model } from './model';
import { MONGO_URI } from '../globals/constants';

export default class Database {
	static async connect() {
		try {
			await mongoose.connect(MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			});
			console.log('Connection to database established!');
		} catch (error) {
			console.log('Connection to database failed! Error log:');
			console.log(error);
		}
	}

	static async saveDish(dishName: string) {
		const menuModel: any = new model.menu();
		menuModel.name = dishName;

		return menuModel.save();
	}

	static async updateDish(oldDishName: string, newDishName: string): Promise<Document|null> {
		try {
			const menuModel = model.menu;
			const filter = {name: oldDishName};
			const update = {$set: {name: newDishName}};

			return menuModel.findOneAndUpdate(filter, update, {new: true});
		} catch (e) {
			throw new Error(e);
		}
	}

	static async deleteDish(dishName: string): Promise<Document|null> {
		try {
			const menuModel = model.menu;
			const filter = {name: dishName};

			return menuModel.findOneAndRemove(filter);
		} catch (e) {
			throw new Error(e);
		}
	}

	static async getMenu(): Promise<Document[]> {
		return mongoose.model('menus').find();
	}
}
