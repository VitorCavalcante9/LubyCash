import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('cpf_from').notNullable();
      table.integer('cpf_to').notNullable();
      table.double('value').notNullable();
      table.timestamp('date');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
