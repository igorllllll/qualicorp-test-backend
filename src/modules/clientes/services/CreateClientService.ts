
import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';



interface IRequest {
    nome: string;
    email: string;
    password: string;
    cpf: string;
    telefone: string;
}


@injectable()
class CreateClientService {
    constructor (
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository
    ) {}

    public async execute ({ nome, email, password, cpf, telefone }: IRequest): Promise<Client>{
        const checkClientEmailExists = await this.clientsRepository.findByEmail(email);

        if (checkClientEmailExists && email != null) {
            throw new AppError('Email address already used.')
        }

        const checkClientCpfExists = await this.clientsRepository.findByCPF(cpf)

        if (checkClientCpfExists) {
            throw new AppError('CPF address already used.')
        }

        if(password && !email){
            throw new AppError('Email not exist.')
        }

        if(email && !password){
            throw new AppError('Password not exist.')
        }

        let hashedPassword

        if(password){
            hashedPassword = await hash(password, 8);
        }

        const client = this.clientsRepository.create({
            nome,
            email,
            password: hashedPassword,
            cpf,
            telefone,
        });


        return client;
    }

}


export default CreateClientService;
