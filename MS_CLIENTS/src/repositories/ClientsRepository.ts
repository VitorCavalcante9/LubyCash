import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../models/Client';

@EntityRepository(Client)
class ClientsRepository extends Repository<Client> {}

export { ClientsRepository };
