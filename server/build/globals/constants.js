"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.APP_DIRECTORY = void 0;
var path_1 = __importDefault(require("path"));
//@ts-ignore
exports.APP_DIRECTORY = path_1.default.dirname(require.main.filename);
//@ts-ignore
exports.MONGO_URI = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;
