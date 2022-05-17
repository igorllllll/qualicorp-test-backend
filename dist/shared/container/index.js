"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("./providers");
var ClientsRepository_1 = __importDefault(require("../../modules/clientes/infra/typeorm/repositories/ClientsRepository"));
tsyringe_1.container.registerSingleton('ClientsRepository', ClientsRepository_1.default);
