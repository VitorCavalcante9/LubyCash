import { Request, Response } from 'express';
import { getCustomRepository, Not, Raw } from 'typeorm';
import { ClientsRepository } from '../repositories/ClientsRepository';

class ClientsController {
  async index(request: Request, response: Response) {
    const { status, date } = request.body;

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
      where: {
        created_at: Raw((alias) =>
          date
            ? `${alias} >= '${date} 00:00:00' and ${alias} <= '${date} 23:59:59'`
            : `${alias} >= '0001-01-01 00:00:00' and ${alias} <= '9999-12-31 23:59:59'`
        ),
        status: status ? status : Not(''),
      },
      relations: ['addresses'],
    });

    return response.status(200).json(clients);
  }

  async show(request: Request, response: Response) {
    const { cpf } = request.params;
    const { email } = request.body;

    const clientsRepository = getCustomRepository(ClientsRepository);
    const client = await clientsRepository.findOne({
      where: { cpf_number: Not(cpf), email },
    });

    return response.status(200).json({ exists: !!client });
  }
}

export default new ClientsController();
