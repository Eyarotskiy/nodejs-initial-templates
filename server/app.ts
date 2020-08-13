require('dotenv').config();
import compression from 'compression';
import express, { Application } from 'express';
import Api from './Api/Api';
import WebSocket from './Api/WebSocket';
import Database from './database/Database';
import {CLIENT_BUILD_DIRECTORY, PORT, SERVER_STATIC_FILES_DIRECTORY, WEBSOCKET_PORT} from './common/constants';
const fileUpload = require('express-fileupload');

const app: Application = express();
const io = require('socket.io')();

class App {
	port: string | number = process.env.PORT || PORT;

	constructor() {
		Database.connect();
		this.initMiddleware();
		Api.initApiRequests(app);
		this.createPort();
		new WebSocket(io);
	}

	initMiddleware(): void {
		app.use(compression());
		app.use(express.json());
		app.use(express.static(CLIENT_BUILD_DIRECTORY));
		app.use(express.static(SERVER_STATIC_FILES_DIRECTORY));
		app.use('/', Api.applyRootRequestMiddleware);
		app.use(fileUpload());
	}

	createPort(): void {
		app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});

		io.listen(WEBSOCKET_PORT);
		console.log(`Websocket server listening on port ${WEBSOCKET_PORT}`);
	}
}

new App();
