import openSocket from 'socket.io-client';
import {IDishUpdateData, IDish} from 'common/types';
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

	updateDish(payload: IDishUpdateData) {
		socket.emit('updateDish', payload);
	}

	deleteDish(dishDeleteName: string) {
		socket.emit('deleteDish', dishDeleteName);
	}
}
