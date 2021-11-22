import { getCustomRepository } from 'typeorm';
import { Client } from '../models/Client';
import { ClientsRepository } from '../repositories/ClientsRepository';
import { resolve } from 'path';
import SendMailService from './SendMailService';

interface IRequest {
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
}

export default class CreateClientService {
  public async execute(data: IRequest): Promise<Client | undefined> {
    const clientsRepository = getCustomRepository(ClientsRepository);

    const verifyIfClientAlreadyExists = await clientsRepository.findOne({
      cpf_number: data.cpf_number,
    });

    const disapprovedMailPath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'disapprovedStatusClientMail.hbs'
    );

    const variables = {
      name: data.full_name,
      cpf: data.cpf_number,
    };

    if (verifyIfClientAlreadyExists) {
      if (verifyIfClientAlreadyExists.status === 'Disapproved') {
        await SendMailService.execute(
          data.email,
          'Status da solicitação',
          variables,
          disapprovedMailPath
        );
      }
      return;
    }

    const status = data.average_salary >= 501 ? 'Approved' : 'Disapproved';

    if (status === 'Approved') {
      data.current_balance += 200;
    }
    console.log(data, { status });

    const client = await clientsRepository.createWithAddresses({
      ...data,
      status,
    });

    if (client) {
      const approvedMailPath = resolve(
        __dirname,
        '..',
        'views',
        'emails',
        'approvedStatusClientMail.hbs'
      );

      if (status === 'Approved') {
        await SendMailService.execute(
          data.email,
          'Status da solicitação',
          variables,
          approvedMailPath
        );
      } else {
        await SendMailService.execute(
          data.email,
          'Status da solicitação',
          variables,
          disapprovedMailPath
        );
      }
    }
    return client;
  }
}
