import { DataSource } from 'typeorm';
import { dataSourceOptions } from './features/core/constants/data-source-options';

export const dataSource = new DataSource(dataSourceOptions);
