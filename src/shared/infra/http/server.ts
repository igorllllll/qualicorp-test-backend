import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes/index';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

import '../typeorm';

import '../../container';
//import '@shared/container';

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});


app.listen(process.env.PORT || 3333, () => {
  console.log('🚀  Server started on port 3333!');
});
