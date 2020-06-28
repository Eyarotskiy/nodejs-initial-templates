require('dotenv').config();
import compression from 'compression';
import path from 'path';
import express, { Application } from 'express';
import Api from './API/Api';
import Database from "./database/Database";
import { APP_DIRECTORY } from './globals/constants';

const app: Application = express();

class App {
	port: string | number = process.env.PORT || 5000;

	constructor() {
		Database.connect();
		this.initMiddlewares();
		Api.initApiRequests(app);
		this.createPort();
	}

	initMiddlewares() {
		app.use(compression());
		app.use(express.json());
		app.use(express.static(path.join(APP_DIRECTORY, '../client/build')));
	}

	createPort() {
		app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

new App();
