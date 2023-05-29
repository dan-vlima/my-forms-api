import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pergunta } from './models/pergunta-model';

@Module({
  imports: [TypeOrmModule.forFeature([Pergunta])],
})
export class PerguntasModule {}
