import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Transaction from 'App/Models/Transaction';

export default class TransactionsController {
  public async index({ request }: HttpContextContract) {
    const { cpf, since, until } = request.qs();

    const transactions = await Transaction.query()
      .where('cpf_from', cpf)
      .orWhere('cpf_to', cpf)
      .where((query) => {
        if (since) query.where('date', '>=', since);
        if (until) query.where('date', '<=', `${until} 23:59:59`);
      });

    return transactions;
  }
}
