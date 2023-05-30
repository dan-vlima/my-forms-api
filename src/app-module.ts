import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './features/core/constants/data-source-options';
import { PerguntasModule } from './features/perguntas/perguntas-module';
import { QuestionariosModule } from './features/questionarios/questionarios-module';
import { RespostasModule } from './features/respostas/respostas-module';
import { UsuariosModule } from './features/usuarios/usuarios-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsuariosModule,
    QuestionariosModule,
    PerguntasModule,
    RespostasModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
