import mongoose, { Schema } from 'mongoose';
import {DishData, UserData} from '../common/types';

const menu: Schema<DishData[]> = new Schema({
	name: String,
	creation_date: {
		type: Date,
		default: Date.now,
	},
});

const users: Schema<UserData[]> = new Schema({
	login: String,
	password: String,
	confirmed: {
		type: Boolean,
		default: false,
	},
	creation_date: {
		type: Date,
		default: Date.now,
	},
});

export const model = {
	menu: mongoose.model('menus', menu),
	users: mongoose.model('users', users),
};
