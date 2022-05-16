import { Router } from 'express';


import clientsRoute from '../../../../modules/clientes/infra/http/routes/client.routes'
import clientProfileRoute from '@modules/clientes/infra/http/routes/client_profile.routes';
import sessionsRoute from '@modules/clientes/infra/http/routes/sessions.routes';




const routes = Router();


routes.use('/profile', clientProfileRoute);

routes.use('/client', clientsRoute);
routes.use('/sessions', sessionsRoute);



export default routes;
