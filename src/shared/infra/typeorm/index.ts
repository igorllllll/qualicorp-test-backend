import { createConnection } from 'typeorm';

require("dotenv").config();


const rootDir = process.env.NODE_ENV === "development" ?
    "src" :
    "dist";

const extensionFile = process.env.NODE_ENV === "development" ?
    "ts" :
    "js";


const config:any = {
    name: "default",
    type: "postgres",
    /*host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE, */
    url: process.env.DATABASE_URL,
    synchronize: false,
    extra:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    },
    entities: [
        rootDir + `/modules/**/infra/typeorm/entities/*.${extensionFile}`
    ],
    migrations: [
        rootDir + `/shared/infra/typeorm/migrations/*.${extensionFile}`
    ],
    cli: {
        migrationsDir: rootDir + "/shared/infra/typeorm/migrations"
    }

}


createConnection(config);
