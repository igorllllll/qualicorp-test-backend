
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    client: Client;
    token: string;
}

@injectable()
class AuthenticateClientService {
    constructor (
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse>{

        const client = await this.clientsRepository.findByEmail(email);

        if(!client){
            throw new AppError('Incorrect email/password combination.', 401)
        }

        //solicitante.password - Senha criptografada
        //password - Senha não criptografada

        const passwordMatched = await compare(password, client.password);

        if (!passwordMatched){
            throw new AppError('Incorrect email/password combination.', 401)
        }

        //Usuário autenticado

        const { secret, expiresIn} = authConfig.jwt;

        const token = sign({  }, secret,{
            subject: client.id,
            expiresIn,
        });

        return {
            client,
            token,
        };
    }
}

export default AuthenticateClientService;
