const mongoose = require('mongoose');
const schemas = require('./schemas');

const models = {
	menu: mongoose.model('menus', schemas.menu),
	dish: mongoose.model('dishes', schemas.dish),
};

module.exports = models;
