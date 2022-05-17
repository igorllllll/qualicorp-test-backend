import { getRepository, Repository } from 'typeorm';

import IClientsRepository from '../../../repositories/IClientsRepository';
import ICreateClientDTO from '../../../dtos/ICreateClientDTO';


import Client from '../entities/Client';




class ClientRepository implements IClientsRepository {
    private ormRepository: Repository<Client>;

    constructor(){
        this.ormRepository = getRepository(Client);
    }

    public async findById(id: string): Promise<Client | undefined>{
        const client = await this.ormRepository.findOne(id);

        return client;
    }

    public async findByEmail(email: string): Promise<Client | undefined>{
        const client = await this.ormRepository.findOne({
            where: { email },
        });

        return client;
    }

    public async findByCPF(cpf: string): Promise<Client | undefined>{
        const client = await this.ormRepository.findOne({
            where: { cpf },
        });

        return client;
    }

    public async create(clientData : ICreateClientDTO): Promise<Client>{
        const client = this.ormRepository.create(clientData);

        await this.ormRepository.save(client);

        return client;
    }

    public async save(client: Client): Promise<Client>{
        return this.ormRepository.save(client)
    }

    public async delete(id: string): Promise<void>{
        await this.ormRepository.delete(id);
    }

}

export default ClientRepository;


