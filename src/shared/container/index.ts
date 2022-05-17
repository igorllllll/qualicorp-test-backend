import { container } from  'tsyringe';

import './providers';


import IClientsRepository from '../../modules/clientes/repositories/IClientsRepository';
import ClientsRepository from '../../modules/clientes/infra/typeorm/repositories/ClientsRepository';


container.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository);

