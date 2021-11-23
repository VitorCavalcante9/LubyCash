import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { ClientsRepository } from '../repositories/ClientsRepository';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const { email, password } = request.body;

    const client = await clientsRepository.findOne({ where: { email } });

    if (!client) {
      return response
        .status(401)
        .json({ message: 'Email e/ou senha inválidos' });
    }

    const isValidPassword = await bcrypt.compare(password, client.password);
    if (!isValidPassword) {
      return response.status(400).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign({ id: client.id }, process.env.APP_KEY, {
      subject: client.id,
      expiresIn: '7d',
    });

    return response.json({ token });
  }
}

export default new AuthController();
