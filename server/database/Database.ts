import mongoose, {Document} from 'mongoose';
import { model } from './model';
import { MONGO_URI } from '../common/constants';

export default class Database {
	static menuModel = model.menu;

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
			const filter = {name: oldDishName};
			const update = {$set: {name: newDishName}};

			return Database.menuModel.findOneAndUpdate(filter, update, {new: true});
		} catch (e) {
			throw new Error(e);
		}
	}

	static async deleteDish(dishName: string): Promise<Document|null> {
		try {
			const filter = {name: dishName};

			return Database.menuModel.findOneAndRemove(filter);
		} catch (e) {
			throw new Error(e);
		}
	}

	static async getMenu(): Promise<Document[]> {
		return Database.menuModel.find();
	}
}
