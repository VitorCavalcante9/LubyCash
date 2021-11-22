import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Producer from 'App/KafkaServices/Producer';

export default class ClientsController {
  public async index({}: HttpContextContract) {}

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
