import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
    id_client: string;
    nome: string;
    email: string;
    password?: string;
    old_password?: string;
    cpf: string;
    telefone: string;
}


@injectable()
class UpdateClientService{
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository
    ){}


    public async execute({id_client, nome, email, password, old_password, cpf, telefone}: IRequest): Promise<Client>{

        const client = await this.clientsRepository.findById(id_client);

        if(!client){
            throw new AppError('Client not found.');
        }

        const clientWithUpdatedEmail = await this.clientsRepository.findByEmail(email);

        if(clientWithUpdatedEmail && clientWithUpdatedEmail.id !== id_client){
            throw new AppError('E-mail already in use.');
        }

        client.nome = nome;
        client.email = email;
        client.cpf = cpf;
        client.telefone = telefone;

        if (password && !old_password){
            throw new AppError('You need to inform the old password to set a new password.');
        }


        if (password && old_password){

            const checkOldPassword = await compare(old_password, client.password);

            if (!checkOldPassword){
                throw new AppError('Old password does not match.');
            }

            client.password = await hash(password, 8);
        }

        return this.clientsRepository.save(client);
    }

}

export default UpdateClientService;
