import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'my-forms',
  entities: ['dist/**/*-model.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};
