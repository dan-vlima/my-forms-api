import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespostasController } from './controllers/respostas-controller';
import { Resposta } from './models/resposta-model';
import { RespostasService } from './services/respostas-service';

@Module({
  imports: [TypeOrmModule.forFeature([Resposta])],
  providers: [RespostasService],
  controllers: [RespostasController],
})
export class RespostasModule {}
