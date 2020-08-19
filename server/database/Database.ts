import mongoose, {Document} from 'mongoose';
import { model } from './model';
import { MONGO_URI } from '../common/constants';

export default class Database {
	static menuModel = model.menu;
	static usersModel = model.users;

	static async connect(): Promise<void> {
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

	static async saveDish(dishName: string): Promise<object|null> {
		try {
			const menuModel: any = new model.menu();
			menuModel.name = dishName;

			return await menuModel.save();
		} catch (e) {
			throw new Error(e);
		}
	}

	static async updateDish(oldDishName: string, newDishName: string): Promise<Document|null> {
		try {
			const filter = {name: oldDishName};
			const update = {$set: {name: newDishName}};

			return await Database.menuModel.findOneAndUpdate(
				filter, update, {new: true});
		} catch(e) {
			throw new Error(e);
		}
	}

	static async deleteDish(dishName: string): Promise<Document|null> {
		try {
			const filter = {name: dishName};

			return await Database.menuModel.findOneAndRemove(filter);
		} catch (e) {
			throw new Error(e);
		}
	}

	static async clearMenu(): Promise<any> {
		try {
			return await Database.menuModel.deleteMany({});
		} catch (e) {
			throw new Error(e);
		}
	}

	static async getMenu(): Promise<Document[]> {
		try {
			return await Database.menuModel.find();
		} catch (e) {
			throw new Error(e);
		}
	}

	static async saveUser(login: string, password: string): Promise<Document[]> {
		try {
			const usersModel: any = new model.users();
			usersModel.login = login;
			usersModel.password = password;

			return await usersModel.save();
		} catch (e) {
			throw new Error(e);
		}
	}

	static async getUsers(): Promise<any> {
		try {
			return await Database.usersModel.find();
		} catch (e) {
			throw new Error(e);
		}
	}

	static async findUser(login: string): Promise<any> {
		try {
			return await Database.usersModel.findOne({login});
		} catch (e) {
			throw new Error(e);
		}
	}

	static async confirmUser(login: string): Promise<any> {
		try {
			const filter = {login};
			const update = {$set: {confirmed: true}};

			return await Database.usersModel.findOneAndUpdate(
				filter, update, {new: true});
		} catch (e) {
			throw new Error(e);
		}
	}
}
