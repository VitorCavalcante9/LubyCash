import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Transaction from 'App/Models/Transaction';

export default class TransactionsController {
  public async index({ request }: HttpContextContract) {
    const { cpf, since, until } = request.qs();

    const transactions = await Transaction.query().where('cpf_from', cpf).orWhere('cpf_to', cpf);
    return transactions;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
