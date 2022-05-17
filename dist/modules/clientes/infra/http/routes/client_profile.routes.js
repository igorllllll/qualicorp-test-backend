"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ClientProfileController_1 = __importDefault(require("../controllers/ClientProfileController"));
var ensureAuthenticated_1 = __importDefault(require("../../http/middleware/ensureAuthenticated"));
var clientProfileRouter = (0, express_1.Router)();
var clientProfileController = new ClientProfileController_1.default();
clientProfileRouter.use(ensureAuthenticated_1.default);
clientProfileRouter.put('/', clientProfileController.update);
clientProfileRouter.delete('/', clientProfileController.delete);
exports.default = clientProfileRouter;
