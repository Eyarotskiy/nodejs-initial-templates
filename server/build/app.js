"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var Api_1 = __importDefault(require("./API/Api"));
var Database_1 = __importDefault(require("./database/Database"));
var constants_1 = require("./common/constants");
var app = express_1.default();
var App = /** @class */ (function () {
    function App() {
        this.port = process.env.PORT || 5000;
        Database_1.default.connect();
        this.initMiddlewares();
        Api_1.default.initApiRequests(app);
        this.createPort();
    }
    App.prototype.initMiddlewares = function () {
        app.use(compression_1.default());
        app.use(express_1.default.json());
        app.use(express_1.default.static(constants_1.CLIENT_BUILD_DIRECTORY));
    };
    App.prototype.createPort = function () {
        var _this = this;
        app.listen(this.port, function () {
            console.log("Server running on port " + _this.port);
        });
    };
    return App;
}());
new App();
