require('dotenv').config();
const compression = require('compression');
const path = require('path');
const express = require('express');
const DB = require('./database/DB');
const Api = require('./API/Api');

const appDir = path.dirname(require.main.filename);
const app = express();

class App {
	constructor() {
		this.port = process.env.PORT || 5000;

		DB.connect();
		this.initMiddleware();
		Api.initApiRequests(app);
		this.createPort();

		const menu = {name: 'Orlov1'};
		DB.saveMenu(menu);
	}

	initMiddleware() {
		app.use(compression());
		app.use(express.json());
		app.use(express.static(path.join(appDir, '../client/build')));
	}

	createPort() {
		app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

new App();
