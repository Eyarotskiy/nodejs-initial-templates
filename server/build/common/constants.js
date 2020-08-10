"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessMessage = exports.SERVER_STATIC_FILES_DIRECTORY = exports.CLIENT_BUILD_DIRECTORY = exports.MONGO_URI = exports.WEBSOCKET_PORT = exports.PORT = exports.APP_DIRECTORY = void 0;
var path_1 = __importDefault(require("path"));
//@ts-ignore
exports.APP_DIRECTORY = path_1.default.dirname(require.main.filename);
exports.PORT = 5000;
exports.WEBSOCKET_PORT = 8000;
exports.MONGO_URI = 'mongodb+srv://new_user:1111@cluster0-u2k69.mongodb.net/Food?retryWrites=true&w=majority';
//@ts-ignore
exports.CLIENT_BUILD_DIRECTORY = process.env.NODE_ENV === 'local' ?
    path_1.default.join(exports.APP_DIRECTORY, '../client/build') :
    path_1.default.join(exports.APP_DIRECTORY, '../../client/build');
exports.SERVER_STATIC_FILES_DIRECTORY = path_1.default.join(exports.APP_DIRECTORY, '/uploadedFiles');
var SuccessMessage;
(function (SuccessMessage) {
    SuccessMessage["DISH_REMOVE"] = "Dish was removed successfully";
    SuccessMessage["DISH_SAVE"] = "Dish was saved successfully";
    SuccessMessage["DISH_UPDATE"] = "Dish was updated successfully";
    SuccessMessage["MENU_CLEAR"] = "Menu was cleared successfully";
    SuccessMessage["IMAGE_UPLOAD"] = "Image was uploaded successfully";
})(SuccessMessage = exports.SuccessMessage || (exports.SuccessMessage = {}));
