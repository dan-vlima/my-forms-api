import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QuestionariosModule } from './features/questionarios/questionarios-module';
import { RespostasModule } from './features/respostas/respostas-module';
import { UsuariosMigration } from './features/usuarios/migrations/usuarios-migration';
import { Usuario } from './features/usuarios/models/usuario-model';
import { UsuariosModule } from './features/usuarios/usuarios-module';

@Module({
  imports: [
    UsuariosModule,
    QuestionariosModule,
    RespostasModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Usuario],
      migrations: [UsuariosMigration],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
