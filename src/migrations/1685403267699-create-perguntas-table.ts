import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePerguntasTable1685403267699 implements MigrationInterface {
  name = 'CreatePerguntasTable1685403267699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'perguntas',
        columns: [
          {
            name: 'cod',
            isPrimary: true,
            type: 'varchar',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cod_questionario',
            type: 'varchar',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['cod_questionario'],
            referencedTableName: 'questionarios',
            referencedColumnNames: ['cod'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
            name: 'FK_perguntas_questionarios',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('perguntas');
  }
}
