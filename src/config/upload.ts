import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

import { request } from 'express';


const tmpFolder = path.resolve(__dirname,'../', '../', 'tmp');

interface IUploadConfig {
    driver : 's3' | 'disk';

    tmpFolder: string,
    uploadsFolder: string,

    multer: {
        storage: StorageEngine,
    },

    config: {
        disk: {},
        aws: {
            bucket: string;
        }
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder: tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename: (request, file, callback) => {
                const fileHash = crypto.randomBytes(10).toString('base64');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },

    config: {
        disk: { },
        aws:{
            bucket: 'qualicorp-test',
        }
    }


} as IUploadConfig;
