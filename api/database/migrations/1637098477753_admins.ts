import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AdminsSchema extends BaseSchema {
  protected tableName = 'admins';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.string('full_name').notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 180).notNullable();
      table.string('remember_me_token');
      table.string('token');
      table.timestamp('token_created_at');
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
