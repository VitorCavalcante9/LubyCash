import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import crypto from 'crypto';
import { resolve } from 'path';
import { ClientsRepository } from '../repositories/ClientsRepository';
import SendMailService from '../services/SendMailService';
import moment from 'moment';

class ForgotPasswordController {
  async store(request: Request, response: Response) {
    try {
      const { email, request_url } = request.body;
      const clientsRepository = getCustomRepository(ClientsRepository);

      const client = await clientsRepository.findOneOrFail({
        where: { email },
      });
      client.token = crypto.randomBytes(10).toString('hex');
      client.token_created_at = new Date();

      await clientsRepository.update(client.id, client);

      const mailPath = resolve(
        __dirname,
        '..',
        'views',
        'emails',
        'forgotPasswordMail.hbs'
      );

      const variables = {
        email,
        token: client.token,
        link: request_url,
      };

      await SendMailService.execute(
        email,
        'Recuperação de senha',
        variables,
        mailPath
      );

      return response.sendStatus(200);
    } catch (err) {
      console.log(err);
      return response.status(err.status).send({
        error: { message: 'Algo não deu certo, esse email existe?' },
      });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { token, password } = request.body;
      const clientsRepository = getCustomRepository(ClientsRepository);

      const client = await clientsRepository.findOneOrFail({
        where: { token },
      });
      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(client.token_created_at);

      if (tokenExpired) {
        return response
          .status(401)
          .json({ error: { message: 'O token de recuperação está expirado' } });
      }

      client.token = null;
      client.token_created_at = null;
      client.password = password;

      await clientsRepository.update(client.id, client);

      return response.sendStatus(200);
    } catch (err) {
      console.log(err);
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado ao resetar sua senha' } });
    }
  }
}

export default new ForgotPasswordController();
