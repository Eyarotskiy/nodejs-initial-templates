const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();

class App {
	constructor() {
		this.port = process.env.PORT || 5000;

		this.initMiddleware();
		this.initApiRequests();
		this.createPort();
	}

	initMiddleware() {
		app.use(compression());
		app.use(express.json());
		app.use(express.static(path.join(__dirname, 'client/build')));
	}

	initApiRequests() {
		app.get('/api/customers', (req, res) => {
			const customers = [
				{id: 1, firstName: 'John', lastName: 'Doe'},
				{id: 2, firstName: 'Brad', lastName: 'Traversy'},
				{id: 3, firstName: 'Mary', lastName: 'Swanson'},
			];

			res.json(customers);
		});

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/build/index.html'));
		});
	}

	createPort() {
		app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

new App();
