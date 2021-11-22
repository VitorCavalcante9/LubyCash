import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Client } from '../models/Client';
import { AddressRepository } from './AddressesRepository';

interface IClient {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  cpf_number: string;
  addresses: Array<{
    address: string;
    city: string;
    state: string;
    zipcode: number;
  }>;
  current_balance: number;
  average_salary: number;
  status: string;
}

@EntityRepository(Client)
class ClientsRepository extends Repository<Client> {
  public async createWithAddresses({
    full_name,
    email,
    password,
    cpf_number,
    phone,
    addresses,
    current_balance,
    average_salary,
    status,
  }: IClient): Promise<Client> {
    const client = this.create({
      full_name,
      email,
      password,
      phone,
      cpf_number,
      current_balance,
      average_salary,
      status,
    });

    await this.save(client);

    const addressesRepository = getCustomRepository(AddressRepository);
    addresses.forEach(async (address) => {
      const newAddress = addressesRepository.create({
        ...address,
        zipcode: Number(address.zipcode),
        client_id: client.id,
      });

      await addressesRepository.save(newAddress);
    });

    return client;
  }
}

export { ClientsRepository };
