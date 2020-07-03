require('dotenv').config();
import compression from 'compression';
import express, { Application } from 'express';
import Api from './API/Api';
import Database from "./database/Database";
import { CLIENT_BUILD_DIRECTORY } from './common/constants';

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
		app.use(express.static(CLIENT_BUILD_DIRECTORY));
	}

	createPort() {
		app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

new App();
