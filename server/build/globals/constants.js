"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_BUILD_DIRECTORY = exports.MONGO_URI = exports.APP_DIRECTORY = void 0;
var path_1 = __importDefault(require("path"));
//@ts-ignore
exports.APP_DIRECTORY = path_1.default.dirname(require.main.filename);
//@ts-ignore
exports.MONGO_URI = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;
//@ts-ignore
exports.CLIENT_BUILD_DIRECTORY = process.env.NODE_ENV === 'local' ?
    path_1.default.join(exports.APP_DIRECTORY, '../client/build') :
    path_1.default.join(exports.APP_DIRECTORY, '../../client/build');
