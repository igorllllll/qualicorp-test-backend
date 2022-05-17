"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var client_routes_1 = __importDefault(require("../../../../modules/clientes/infra/http/routes/client.routes"));
var client_profile_routes_1 = __importDefault(require("../../../../modules/clientes/infra/http/routes/client_profile.routes"));
var sessions_routes_1 = __importDefault(require("../../../../modules/clientes/infra/http/routes/sessions.routes"));
var routes = (0, express_1.Router)();
routes.use('/profile', client_profile_routes_1.default);
routes.use('/client', client_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
exports.default = routes;
