import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import Producer from '../kafkaService/Producer';
import { ClientsRepository } from '../repositories/ClientsRepository';

class TransactionsController {
  async store(request: Request, response: Response) {
    const { type, cpf_to, value } = request.body;
    const clientsRepository = getCustomRepository(ClientsRepository);

    try {
      const client = await clientsRepository.findOneOrFail(request.userId);

      if (client.current_balance < value) {
        return response.status(400).json({
          error: {
            message:
              'Você não tem saldo disponível o suficiente para realizar a transação',
          },
        });
      }

      const targetClient = await clientsRepository.findOne({
        where: { cpf_number: cpf_to },
      });
      if (!targetClient) {
        return response.status(400).json({
          error: { message: 'Nenhuma conta está registrada com este cpf' },
        });
      }

      client.current_balance -= value;
      await clientsRepository.update(client.id, client);

      targetClient.current_balance += value;
      await clientsRepository.update(targetClient.id, targetClient);

      const data = {
        type,
        cpf_from: client.cpf_number,
        cpf_to,
        value,
      };

      const producer = new Producer();
      producer.produce({
        topic: 'new-transaction',
        messages: [{ value: JSON.stringify(data) }],
      });

      return response.sendStatus(200);
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ error: { message: 'Algo deu errado na transferência' } });
    }
  }
}

export default new TransactionsController();
