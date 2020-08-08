import mongoose, { Schema } from 'mongoose';
import { Menu } from '../common/types';

const menu: Schema<Menu> = new Schema({
	name: String,
	creation_date: {
		type: Date,
		default: Date.now,
	},
});

const users: Schema<Menu> = new Schema({
	login: String,
	password: String,
	creation_date: {
		type: Date,
		default: Date.now,
	},
});

export const model = {
	menu: mongoose.model('menus', menu),
	users: mongoose.model('users', users),
};
