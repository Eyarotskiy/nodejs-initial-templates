import path from 'path';

//@ts-ignore
export const APP_DIRECTORY: string = path.dirname(require.main.filename);

//@ts-ignore
export const MONGO_URI: string = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;

//@ts-ignore
export const CLIENT_BUILD_DIRECTORY: string =
	process.env.NODE_ENV === 'local' ?
		path.join(APP_DIRECTORY, '../client/build') :
		path.join(APP_DIRECTORY, '../../client/build');

export enum SuccessMessage {
	DISH_REMOVE = 'Dish was removed successfully',
	DISH_SAVE = 'Dish was saved successfully',
	DISH_UPDATE = 'Dish was updated successfully',
}
