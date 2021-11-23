/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import Transaction from 'App/Models/Transaction';

interface IRequest {
  cpf_to: string;
  cpf_from: string;
  value: number;
}

export default class RegisterTransactionService {
  public async execute(data: IRequest): Promise<Transaction | undefined> {
    const transaction = await Transaction.create(data);
    return transaction;
  }
}
