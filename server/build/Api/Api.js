"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var constants_1 = require("../common/constants");
var Database_1 = __importDefault(require("../database/Database"));
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.initApiRequests = function (app) {
        app.get('/api/menu/get', Api.handleMenuGetRequest);
        app.post('/api/dish/save', Api.handleDishSaveRequest);
        app.post('/api/dish/update', Api.handleDishUpdateRequest);
        app.post('/api/dish/delete', Api.handleDishDeleteRequest);
        app.post('/api/menu/clear', Api.handleMenuClearRequest);
        app.post('/file/upload', Api.handleFileUploadRequest);
        app.get('/*', Api.handleRootRequest);
    };
    Api.handleDishSaveRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dishName, savedDish, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dishName = req.body.dishName;
                        return [4 /*yield*/, Database_1.default.saveDish(dishName)];
                    case 1:
                        savedDish = _a.sent();
                        Api.sendSuccess(res, savedDish);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        Api.sendError(res, 400, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Api.handleDishUpdateRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, oldDishName, newDishName, updatedDish, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, oldDishName = _a.oldDishName, newDishName = _a.newDishName;
                        return [4 /*yield*/, Database_1.default.updateDish(oldDishName, newDishName)];
                    case 1:
                        updatedDish = _b.sent();
                        Api.sendSuccess(res, updatedDish);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        Api.sendError(res, 400, error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Api.handleDishDeleteRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dishName, deletedDish, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dishName = req.body.dishName;
                        return [4 /*yield*/, Database_1.default.deleteDish(dishName)];
                    case 1:
                        deletedDish = _a.sent();
                        Api.sendSuccess(res, deletedDish);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        Api.sendError(res, 400, error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Api.handleMenuClearRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Database_1.default.clearMenu()];
                    case 1:
                        result = _a.sent();
                        Api.sendSuccess(res, result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        Api.sendError(res, 400, error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Api.handleMenuGetRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var menu, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Database_1.default.getMenu()];
                    case 1:
                        menu = _a.sent();
                        Api.sendSuccess(res, menu);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        Api.sendError(res, 400, error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Api.handleFileUploadRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var file, destinationPath, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!fs_1.default.existsSync(constants_1.SERVER_STATIC_FILES_DIRECTORY)) {
                            fs_1.default.mkdirSync(constants_1.SERVER_STATIC_FILES_DIRECTORY);
                        }
                        file = req.files.file;
                        destinationPath = path_1.default.join(constants_1.SERVER_STATIC_FILES_DIRECTORY, '/', file.name);
                        return [4 /*yield*/, file.mv(destinationPath)];
                    case 1:
                        _a.sent();
                        result = {
                            url: req.protocol + "://" + req.get('host') + "/" + file.name,
                        };
                        Api.sendSuccess(res, result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        Api.sendError(res, 500, error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Api.handleRootRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.sendFile(path_1.default.join(constants_1.CLIENT_BUILD_DIRECTORY, 'index.html'));
                }
                catch (error) {
                    Api.sendError(res, 400, error);
                }
                return [2 /*return*/];
            });
        });
    };
    Api.sendSuccess = function (res, data) {
        if (data === void 0) { data = {}; }
        res.status(200).json(data);
    };
    Api.sendError = function (res, code, error) {
        var response = {
            code: code,
            message: error.message,
            stack: error.stack,
        };
        res.status(code).send(response);
    };
    return Api;
}());
exports.default = Api;