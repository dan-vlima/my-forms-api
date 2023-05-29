import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionariosController } from './controllers/questionarios-controller';
import { Questionario } from './models/questionario-model';
import { QuestionariosService } from './services/questionarios-service';

@Module({
  imports: [TypeOrmModule.forFeature([Questionario])],
  providers: [QuestionariosService],
  controllers: [QuestionariosController],
})
export class QuestionariosModule {}
