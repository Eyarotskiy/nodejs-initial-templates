import openSocket from 'socket.io-client';
import {DishUpdateData, DishData} from 'common/types';
import {getAppUrl} from 'common/utils';
const socket = openSocket(`${getAppUrl()}:8000`, {transports: ['websocket']});

export default class WebSocket {
	constructor() {
		this.initErrorHandler();
	}

	initErrorHandler() {
		socket.on('menuError', (errorMessage: string) => {
			console.error(errorMessage);
		});
	}

	getMenu(callback: Function) {
		socket.on('getMenu', (response: DishData) => {
			callback(response);
		});
	}

	clearMenu() {
		socket.emit('clearMenu');
	}

	saveDish(dishCreateName: string) {
		socket.emit('saveDish', dishCreateName);
	}

	updateDish(payload: DishUpdateData) {
		socket.emit('updateDish', payload);
	}

	deleteDish(dishDeleteName: string) {
		socket.emit('deleteDish', dishDeleteName);
	}
}
