export type Menu = IDish[];

export interface IApiResponse {
	code: number,
	message: string,
	data?: object|null,
}

export interface IDish {
	name: string,
}
