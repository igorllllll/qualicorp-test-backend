import { inject, injectable } from 'tsyringe';



import IClientsRepository from '../repositories/IClientsRepository';




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
