import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: '34.151.216.54',
  username: 'postgres',
  password: 'jI4|jHIY}$k7Mx_K',
  database: 'my-forms',
  entities: ['dist/**/*-model.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};
