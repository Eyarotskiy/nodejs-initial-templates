export type MenuProps = {
	menu: Array<IDish>,
};

export interface IApiResponse {
	code: number,
	message: string,
	data?: object|null,
}

export interface IDish {
	_id: string,
	name: string,
}
