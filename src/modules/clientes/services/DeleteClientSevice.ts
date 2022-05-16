import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';


import IClientsRepository from '../repositories/IClientsRepository';
import Client from '@modules/clientes/infra/typeorm/entities/Client';



interface IRequest {
    id_client: string;
}


@injectable()
class DeleteProfileService{
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository
    ){}

    public async execute({id_client,}: IRequest): Promise<true>{
        await this.clientsRepository.delete(id_client);

        return true;
    }

}

export default DeleteProfileService;
