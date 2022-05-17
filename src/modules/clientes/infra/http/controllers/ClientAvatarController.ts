import { Request, Response } from 'express';
import { container } from 'tsyringe';


import UpdateAvatarClientService from '../../../services/UpdateAvatarClientService';


export default class ClientAvatarController {
    public async update(request: Request, response: Response): Promise<Response>{
        const updateAvatarClient = container.resolve(UpdateAvatarClientService)

        const client = await updateAvatarClient.execute({
            id_client: request.user.id,
            avatarFilename: request.file!.filename
        });

        return response.json(client);

    }
}
