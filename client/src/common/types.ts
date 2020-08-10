export type LoginField = string;

export type PasswordField = string;

export type Token = string;

export interface IMenuProps {
	menu: Array<IDish>,
}

export interface IDish {
	_id: string,
	creation_date: Date,
	name: string,
}

export interface ILoginForm {
	login: 	LoginField,
	password: PasswordField,
}

export interface IDishName {
	dishName: string,
}

export interface IDishUpdateData {
	oldDishName: string,
	newDishName: string,
}
