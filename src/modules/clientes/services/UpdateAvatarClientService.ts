

import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';


import IClientsRepository from '../repositories/IClientsRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import Client from '../infra/typeorm/entities/Client';


interface IRequest{
    id_client: string;
    avatarFilename: string;
}


@injectable()
class UpdateAvatarClientService{
    constructor (
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({id_client, avatarFilename}: IRequest): Promise<Client>{


        const client = await this.clientsRepository.findById(id_client);

        if(!client){
            throw new AppError ('Only autheticated clients can chance avatar.', 401);
        }

        if(client.avatar){
            // Deletar avatar anterior

            await this.storageProvider.deleteFile(client.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        client.avatar = filename;

        await this.clientsRepository.save(client);

        return client;
    }
}

export default UpdateAvatarClientService;
