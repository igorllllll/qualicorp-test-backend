import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import DeleteClientSevice from '@modules/clientes/services/DeleteClientSevice';
import UpdateClientService from '@modules/clientes/services/UpdateClientService';


export default class UpdateClientController {


    public async delete(request: Request, response: Response): Promise<any>{
        const id_client = request.user.id;

        const deleteProfile = container.resolve(DeleteClientSevice);

        const deleteClient = await deleteProfile.execute({ id_client });

        if(deleteClient==true){
            return response.status(204).json();
        }
    }


    public async update(request: Request, response: Response): Promise<Response>{

        const id_client = request.user.id;

        const { nome, email, password, old_password, cpf, telefone } = request.body;

        const updateClient = container.resolve(UpdateClientService);

        const client = await updateClient.execute({
            id_client,
            nome,
            email,
            cpf,
            telefone,
            old_password,
            password
        });

        return response.json(classToClass(client));
    }
}
