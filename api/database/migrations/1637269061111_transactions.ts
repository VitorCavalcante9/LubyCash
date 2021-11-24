import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('type').notNullable();
      table.string('cpf_from', 11).notNullable();
      table.string('cpf_to', 11).notNullable();
      table.double('value').notNullable();
      table.timestamp('date');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
