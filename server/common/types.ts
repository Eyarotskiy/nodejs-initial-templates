export interface IApiResponse {
	code: number,
	message: string,
	stack?: string,
	data?: object|null,
}

export interface IDish {
	_id: string,
	creation_date: Date,
	name: string,
}

export interface IDishUpdateData {
	oldDishName: string,
	newDishName: string,
}

export interface IUser {
	_id: string,
	creation_date: Date,
	login: string,
	password: string,
}

export interface IUserSignInResponse {
	token: string|null,
}

export interface IUserSignUpResponse {
	users: string[],
}
