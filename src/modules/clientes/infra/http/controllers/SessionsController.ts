import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateClientService from "@modules/clientes/services/AuthenticateClientService";


export default class SessionsController {
    public async create (request: Request, response: Response): Promise<Response>{
        const { email, password } = request.body;

        const autheticateClient = container.resolve(AuthenticateClientService);

        const { client, token } = await autheticateClient.execute({
            email,
            password,
        })

        //delete solicitante.password;

        return response.json({ client, token });
    }
}
