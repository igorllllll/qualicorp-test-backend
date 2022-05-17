"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../../../../../config/upload"));
var ClientController_1 = __importDefault(require("../controllers/ClientController"));
var ClientAvatarController_1 = __importDefault(require("../controllers/ClientAvatarController"));
var ensureAuthenticated_1 = __importDefault(require("../../http/middleware/ensureAuthenticated"));
var clientsRouter = (0, express_1.Router)();
var upload = (0, multer_1.default)(upload_1.default.multer);
var clientsController = new ClientController_1.default();
var clientAvatarController = new ClientAvatarController_1.default();
clientsRouter.post('/', clientsController.create);
clientsRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), clientAvatarController.update);
exports.default = clientsRouter;
