const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemas = {
	menu: new Schema({name: String}),
	dish: new Schema({
		name: String,
		name2: String,
		name3: String,
	}),
};

module.exports = schemas;
