import mongoose, { Schema } from 'mongoose';
import { Menu } from "../globals/types";

const menu: Schema<Menu> = new Schema({
	name: String,
});

export const model = {
	menu: mongoose.model('menus', menu),
};
