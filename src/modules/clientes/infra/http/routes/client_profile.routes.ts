import { Router } from 'express';


import ClientProfileController from '../controllers/ClientProfileController';

import ensureAuthenticated from '@modules/clientes/infra/http/middleware/ensureAuthenticated';
import clientRouter from './client.routes';


const clientProfileRouter = Router();
const clientProfileController = new ClientProfileController()

clientProfileRouter.use(ensureAuthenticated);

clientProfileRouter.put('/', clientProfileController.update);
clientProfileRouter.delete('/', clientProfileController.delete);

export default clientProfileRouter;
