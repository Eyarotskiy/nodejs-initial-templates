export interface ApiResponse {
	code: number,
	message: string,
	stack?: string,
	data?: object|null,
}

export interface DishData {
	_id: string,
	creation_date: Date,
	name: string,
}

export interface DishUpdateData {
	oldDishName: string,
	newDishName: string,
}

export interface UserData {
	_id: string,
	confirmed: boolean,
	creation_date: Date,
	login: string,
	password: string,
}

export interface UserSignInResponse {
	token: string|null,
}

export interface UserSignUpResponse {
	users: string[],
}
