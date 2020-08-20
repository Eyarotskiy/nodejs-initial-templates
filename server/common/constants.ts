import path from 'path';

//@ts-ignore
export const APP_DIRECTORY: string = path.dirname(require.main.filename);

export const PORT: number = 5000;

export const WEBSOCKET_PORT: number = 8000;

export const JWT_SECRET: string = 'secret';

//@ts-ignore
export const MONGO_URI: string = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;

//@ts-ignore
export const CLIENT_BUILD_DIRECTORY: string =
	process.env.NODE_ENV === 'local' ?
		path.join(APP_DIRECTORY, '../client/build') :
		path.join(APP_DIRECTORY, '../../client/build');

export const SERVER_STATIC_FILES_DIRECTORY: string =
	path.join(APP_DIRECTORY, '/uploadedFiles');

export const ERROR_LOG_FILE_PATH: string =
	path.join(APP_DIRECTORY, 'error.log');

export enum SuccessMessage {
	DISH_REMOVE = 'Dish was removed successfully',
	DISH_SAVE = 'Dish was saved successfully',
	DISH_UPDATE = 'Dish was updated successfully',
	MENU_CLEAR = 'Menu was cleared successfully',
	IMAGE_UPLOAD = 'Image was uploaded successfully',
}
