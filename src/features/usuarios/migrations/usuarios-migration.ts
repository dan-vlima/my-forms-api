import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsuariosMigration implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const test = 'test';
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const test = 'test';
  }
}
