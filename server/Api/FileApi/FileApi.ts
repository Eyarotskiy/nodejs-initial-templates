import {Response} from 'express';
import fs from 'fs';
import {SERVER_STATIC_FILES_DIRECTORY} from '../../common/constants';
import Api from '../Api';
import path from 'path';

export default class FileApi {
	static async handleFileUploadRequest(req: any, res:Response): Promise<void> {
		try {
			if (!fs.existsSync(SERVER_STATIC_FILES_DIRECTORY)) {
				fs.mkdirSync(SERVER_STATIC_FILES_DIRECTORY);
			}
			const {file} = req.files;
			const destinationPath = path.join(SERVER_STATIC_FILES_DIRECTORY, '/', file.name);
			await file.mv(destinationPath);
			const result = {
				url: `${req.protocol}://${req.get('host')}/${file.name}`,
			};
			Api.sendSuccess(res, result);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}
}
