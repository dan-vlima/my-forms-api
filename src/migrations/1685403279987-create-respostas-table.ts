import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRespostasTable1685403279987 implements MigrationInterface {
  name = 'CreateRespostasTable1685403279987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'respostas',
        columns: [
          {
            name: 'cod',
            isPrimary: true,
            type: 'varchar',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cod_pergunta',
            type: 'varchar',
          },
          {
            name: 'cod_usuario',
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
            columnNames: ['cod_pergunta'],
            referencedTableName: 'perguntas',
            referencedColumnNames: ['cod'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
            name: 'FK_respostas_perguntas',
          },
          {
            columnNames: ['cod_usuario'],
            referencedTableName: 'usuarios',
            referencedColumnNames: ['cod'],
            onDelete: 'cascade',
            onUpdate: 'cascade',
            name: 'FK_respostas_usuarios',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('respostas');
  }
}
