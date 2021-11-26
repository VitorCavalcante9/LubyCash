import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ClientsRepository } from '../repositories/ClientsRepository';

class ClientsController {
  async index(request: Request, response: Response) {
    console.log('hey');
    const clientsRepository = getCustomRepository(ClientsRepository);
    const clients = await clientsRepository.find({
      select: [
        'id',
        'full_name',
        'email',
        'phone',
        'cpf_number',
        'current_balance',
        'average_salary',
        'status',
      ],
    });

    console.log(clients);
    return response.status(200).json(clients);
  }
}

export default new ClientsController();
