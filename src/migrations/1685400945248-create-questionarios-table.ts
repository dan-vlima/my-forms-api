import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateQuestionariosTable1685400945248
  implements MigrationInterface
{
  name = 'CreateQuestionariosTable1685400945248';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questionarios',
        columns: [
          {
            name: 'cod',
            isPrimary: true,
            type: 'varchar',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cod_usuario',
            type: 'varchar',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'data',
            type: 'timestamptz',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['cod_usuario'],
            referencedTableName: 'usuarios',
            referencedColumnNames: ['cod'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
            name: 'FK_questionarios_usuarios',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questionarios');
  }
}
