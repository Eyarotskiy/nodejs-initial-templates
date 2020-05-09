const express = require('express');
const app = express();

class App {
	constructor() {
		this.port = 5000;

		this.initApiRequests();
		this.createPort();
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
	}

	createPort() {
		app.listen(this.port, () => `Server running on port ${this.port}`);
	}
}

new App();
