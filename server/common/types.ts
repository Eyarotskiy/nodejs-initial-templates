export type Menu = Array<IDish>;

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
