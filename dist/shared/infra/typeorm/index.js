"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
require("dotenv").config();
var rootDir = process.env.NODE_ENV === "development" ?
    "src" :
    "dist";
var extensionFile = process.env.NODE_ENV === "development" ?
    "ts" :
    "js";
var config = {
    name: "default",
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: false,
    extra: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    entities: [
        rootDir + "/modules/**/infra/typeorm/entities/*.".concat(extensionFile)
    ],
    migrations: [
        rootDir + "/shared/infra/typeorm/migrations/*.".concat(extensionFile)
    ],
    cli: {
        migrationsDir: rootDir + "/shared/infra/typeorm/migrations"
    }
};
(0, typeorm_1.createConnection)(config);
