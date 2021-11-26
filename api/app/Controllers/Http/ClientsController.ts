import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Producer from 'App/KafkaServices/Producer';
import axios from 'axios';

export default class ClientsController {
  public async index({ request, response }: HttpContextContract) {
    const { status, date } = request.qs();
    const msClients = axios.create({
      baseURL: `http://${process.env.MS_HOST?.split(':')[0]}:${process.env.MS_PORT}`,
      responseType: 'json',
    });

    let clients = [];

    await msClients
      .get('clients', {
        headers: { Authorization: process.env.MS_SECRET! },
        data: { status, date },
      })
      .then((response) => {
        const data = response.data;
        clients = data;
      })
      .catch();

    return response.json(clients);
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      'full_name',
      'email',
      'password',
      'phone',
      'cpf_number',
      'addresses',
      'current_balance',
      'average_salary',
    ]);

    const producer = new Producer();
    producer.produce({ topic: 'create-client', messages: [{ value: JSON.stringify(data) }] });

    return response.status(200);
  }
}
