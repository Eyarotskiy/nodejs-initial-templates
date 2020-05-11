const mongoose = require('mongoose');
const models = require('./models');
const uri = process.env.MONGODB_URI_LOCAL || process.env.MONGODB_URI;

class DB {
	static async connect() {
		try {
			await mongoose.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log('Connection to database established!');
		} catch (error) {
			console.log('Connection to database failed! Error log:');
			console.log(error);
		}
	}

	static async saveMenu(menu) {
		let model = new models.menu();
		await DB.save_(model, menu, 'menu');
	}

	static async save_(model, data, label) {
		try {
			model = DB.copyObjectParams_(model, data);
			await model.save();
			console.log(`${label} saved successfully!`);
		} catch (error) {
			console.log(`Couldn't save menu:`);
			console.log(error);
		}
	}

	static copyObjectParams_(obj1, obj2) {
		for (const param of Object.keys(obj2)) {
			obj1[param] = obj2[param];
		}
		return obj1;
	}
}

module.exports = DB;
