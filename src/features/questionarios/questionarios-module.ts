import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pergunta } from '../perguntas/models/pergunta-model';
import { PerguntasService } from '../perguntas/services/perguntas-service';
import { Usuario } from '../usuarios/models/usuario-model';
import { UsuariosService } from '../usuarios/services/usuarios-service';
import { QuestionariosController } from './controllers/questionarios-controller';
import { Questionario } from './models/questionario-model';
import { QuestionariosService } from './services/questionarios-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Questionario]),
    TypeOrmModule.forFeature([Usuario]),
    TypeOrmModule.forFeature([Pergunta]),
  ],
  providers: [QuestionariosService, UsuariosService, PerguntasService],
  controllers: [QuestionariosController],
})
export class QuestionariosModule {}
