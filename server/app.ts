require('dotenv').config();
import compression from 'compression';
import express, { Application } from 'express';
import Api from './Api/Api';
import Database from './database/Database';
import {CLIENT_BUILD_DIRECTORY, PORT, SERVER_STATIC_FILES_DIRECTORY} from './common/constants';
const fileUpload = require('express-fileupload');

const app: Application = express();

class App {
	port: string | number = process.env.PORT || PORT;

	constructor() {
		Database.connect();
		this.initMiddlewares();
		Api.initApiRequests(app);
		this.createPort();
	}

	initMiddlewares(): void {
		app.use(compression());
		app.use(express.json());
		app.use(express.static(CLIENT_BUILD_DIRECTORY));
		app.use(express.static(SERVER_STATIC_FILES_DIRECTORY));
		app.use(fileUpload());
	}

	createPort(): void {
		app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

new App();
