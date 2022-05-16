import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';


export default interface ISolicitanteRepository {
    findById(id: string): Promise<Client | undefined>;
    findByEmail(email: string): Promise<Client | undefined>;
    findByCPF(cpf: string): Promise<Client | undefined>;
    create(data: ICreateClientDTO): Promise<Client>;
    save(client: Client): Promise<Client>;
    delete(id: string): Promise<void>;
}
