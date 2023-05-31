import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pergunta } from '../perguntas/models/pergunta-model';
import { PerguntasService } from '../perguntas/services/perguntas-service';
import { RespostasController } from './controllers/respostas-controller';
import { Resposta } from './models/resposta-model';
import { RespostasService } from './services/respostas-service';

@Module({
  imports: [TypeOrmModule.forFeature([Resposta, Pergunta])],
  providers: [RespostasService, PerguntasService],
  controllers: [RespostasController],
})
export class RespostasModule {}
