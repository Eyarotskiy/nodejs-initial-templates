"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var Api_1 = __importDefault(require("./Api/Api"));
var WebSocket_1 = __importDefault(require("./Api/WebSocket"));
var Database_1 = __importDefault(require("./database/Database"));
var constants_1 = require("./common/constants");
var fileUpload = require('express-fileupload');
var app = express_1.default();
var io = require('socket.io')();
var App = /** @class */ (function () {
    function App() {
        this.port = process.env.PORT || constants_1.PORT;
        Database_1.default.connect();
        this.initMiddleware();
        Api_1.default.initApiRequests(app);
        this.createPort();
        new WebSocket_1.default(io);
    }
    App.prototype.initMiddleware = function () {
        app.use(compression_1.default());
        app.use(express_1.default.json());
        app.use(express_1.default.static(constants_1.CLIENT_BUILD_DIRECTORY));
        app.use(express_1.default.static(constants_1.SERVER_STATIC_FILES_DIRECTORY));
        app.use(fileUpload());
    };
    App.prototype.createPort = function () {
        var _this = this;
        app.listen(this.port, function () {
            console.log("Server running on port " + _this.port);
        });
        io.listen(constants_1.WEBSOCKET_PORT);
        console.log("Websocket server listening on port " + constants_1.WEBSOCKET_PORT);
    };
    return App;
}());
new App();
