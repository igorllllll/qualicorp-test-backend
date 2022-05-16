import { request, response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import { container } from 'tsyringe';

import ClientController from '../controllers/ClientController';
import ClientAvatarController from '../controllers/ClientAvatarController';

import ensureAuthenticated from '@modules/clientes/infra/http/middleware/ensureAuthenticated';



const clientsRouter = Router();
const upload = multer(uploadConfig.multer);
const clientsController = new ClientController()
const clientAvatarController = new ClientAvatarController()


clientsRouter.post('/', clientsController.create);



clientsRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), clientAvatarController.update);


export default clientsRouter;
