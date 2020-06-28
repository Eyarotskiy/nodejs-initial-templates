import path from 'path';

//@ts-ignore
export const APP_DIRECTORY: string = path.dirname(require.main.filename);

//@ts-ignore
export const MONGO_URI: string = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;
