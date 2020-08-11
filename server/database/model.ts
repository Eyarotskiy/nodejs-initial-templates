import mongoose, { Schema } from 'mongoose';
import {IDish, IUser} from '../common/types';

const menu: Schema<IDish[]> = new Schema({
	name: String,
	creation_date: {
		type: Date,
		default: Date.now,
	},
});

const users: Schema<IUser[]> = new Schema({
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
