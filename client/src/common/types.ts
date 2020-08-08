export type MenuProps = {
	menu: Array<IDish>,
};

export interface IDish {
	_id: string,
	creation_date: Date,
	name: string,
}

export type LoginForm = {
	login: 	LoginField,
	password: PasswordField,
}

export type LoginField = string;

export type PasswordField = string;

export type Token = string;

export type DishName = {
	dishName: string,
}

export type DishUpdateData = {
	oldDishName: string,
	newDishName: string,
}
