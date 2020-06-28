import mongoose, { Schema } from 'mongoose';
import { IDish, IMenu } from "../globals/types";

const menu: Schema<IMenu> = new Schema({
	name: String,
});

const dish: Schema<IDish> = new Schema({
	index: Number,
	name: String,
});

export const model = {
	menu: mongoose.model('menus', menu),
	dish: mongoose.model('dishes', dish),
};
