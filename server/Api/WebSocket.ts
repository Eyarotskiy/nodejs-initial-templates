import Database from '../database/Database';
import {IDishUpdateData} from '../common/types';

export default class WebSocket {
	client: any;
	io: any;

	constructor(io: any) {
		this.io = io;

		this.initSocket();
	}

	initSocket() {
		this.io.on('connection', async (client: any) => {
			this.client = client;

			await this.initMenuRequests();
		});
	}

	initMenuRequests() {
		this.client.on('clearMenu', () => void this.clearMenu());
		this.client.on('saveDish',
			(dishCreateName: string) => void this.saveDish(dishCreateName));
		this.client.on('updateDish',
			(payload: IDishUpdateData) => void this.updateDish(payload));
		this.client.on('deleteDish',
			(dishDeleteName: string) => void this.deleteDish(dishDeleteName));

		this.emitMenu();
	}

	emitError(error: string) {
		this.client.emit('menuError', error);
	}

	async emitMenu() {
		try {
			const menu = await Database.getMenu();
			this.client.emit('getMenu', menu);
		} catch (e) {
			this.emitError('Emit menu error');
		}
	}

	async emitMenuToAll() {
		try {
			const menu = await Database.getMenu();
			this.io.sockets.emit('getMenu', menu);
		} catch (e) {
			this.emitError('Emit menu to all error');
		}
	}

	async clearMenu() {
		try {
			await Database.clearMenu();
			await this.emitMenuToAll();
		} catch (e) {
			this.emitError('Menu clear error');
		}
	}

	async saveDish(dishCreateName: string) {
		try {
			await Database.saveDish(dishCreateName);
			await this.emitMenuToAll();
		} catch (e) {
			this.emitError('Dish save error');
		}
	}

	async updateDish(payload: IDishUpdateData) {
		try {
			const {oldDishName, newDishName} = payload;
			await Database.updateDish(oldDishName, newDishName);
			await this.emitMenuToAll();
		} catch (e) {
			this.emitError('Dish update error');
		}
	}

	async deleteDish(dishDeleteName: string) {
		try {
			await Database.deleteDish(dishDeleteName);
			await this.emitMenuToAll();
		} catch (e) {
			this.emitError('Dish delete error');
		}
	}
}
