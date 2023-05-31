import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pergunta } from '../perguntas/models/pergunta-model';
import { PerguntasService } from '../perguntas/services/perguntas-service';

@Module({
  imports: [TypeOrmModule.forFeature([Pergunta])],
  providers: [PerguntasService],
})
export class PerguntasModule {}
