import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clientes/services/CreateClientService';
import UpdateClientService from '@modules/clientes/services/UpdateClientService';


export default class SolicitantesController {


    public async create (request: Request, response: Response): Promise<Response>{
        const { nome, email, password, cpf, telefone } = request.body;

        const createClient = container.resolve(CreateClientService)

        const client = await createClient.execute({
            nome,
            email,
            password,
            cpf,
            telefone,
        });


        return response.json(client)
    }


}
