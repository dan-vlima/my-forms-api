import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsuariosTable1685339083921 implements MigrationInterface {
  name = 'CreateUsuariosTable1685339083921';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuarios',
        columns: [
          {
            name: 'cod',
            isPrimary: true,
            type: 'varchar',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'senha',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'cpf',
            type: 'char',
            length: '11',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuarios');
  }
}
