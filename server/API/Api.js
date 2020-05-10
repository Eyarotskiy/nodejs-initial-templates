const path = require('path');

const appDir = path.dirname(require.main.filename);

class Api {
	static initApiRequests(app) {
		app.get('/api/customers', Api.handleCustomersRequest);
		app.get('/*', Api.handleRootRequest);
	}

	static async handleRootRequest(req, res) {
		try {
			res.sendFile(path.join(appDir, '../client/build', 'index.html'));
		} catch (error) {
			console.log(error);
		}
	}

	static async handleCustomersRequest(req, res) {
		try {
			const customers = [
				{id: 1, firstName: 'John', lastName: 'Doe'},
				{id: 3, firstName: 'Mary', lastName: 'Swanson'},
			];

			res.json(customers);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Api;
