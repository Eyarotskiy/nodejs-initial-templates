export type MenuProps = {
	menu: Array<IDish>,
};

export interface IDish {
	_id: string,
	creation_date: Date,
	name: string,
}

export type DishName = {
	dishName: string,
}

export type DishUpdateData = {
	oldDishName: string,
	newDishName: string,
}
