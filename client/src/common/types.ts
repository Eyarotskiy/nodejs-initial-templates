export type LoginField = string;

export type PasswordField = string;

export type Token = string;

export interface MenuProps {
	menu: Array<DishData>,
}

export interface DishData {
	_id: string,
	creation_date: Date,
	name: string,
}

export interface LoginForm {
	login: 	LoginField,
	password: PasswordField,
}

export interface DishName {
	dishName: string,
}

export interface DishUpdateData {
	oldDishName: string,
	newDishName: string,
}
