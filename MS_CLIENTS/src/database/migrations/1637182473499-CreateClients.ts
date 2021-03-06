import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClients1637182473499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '11',
          },
          {
            name: 'cpf_number',
            type: 'varchar',
            length: '11',
          },
          {
            name: 'current_balance',
            type: 'double',
          },
          {
            name: 'average_salary',
            type: 'double',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'token_created_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
