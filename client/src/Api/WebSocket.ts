import openSocket from 'socket.io-client';
import {DishUpdateData, IDish} from 'common/types';
const socket = openSocket('http://localhost:8000', {transports: ['websocket']});

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
		socket.on('getMenu', (response: IDish) => {
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
