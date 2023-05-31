import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pergunta } from '../models/pergunta-model';
import { CreatePerguntaSchema } from '../schemas/create-pergunta-schema';

@Injectable()
export class PerguntasService {
  constructor(
    @InjectRepository(Pergunta)
    private perguntasRepository: Repository<Pergunta>,
  ) {}

  async findAll(): Promise<Pergunta[]> {
    return await this.perguntasRepository.find();
  }

  async create(pergunta: CreatePerguntaSchema): Promise<Pergunta> {
    const createdPergunta = await this.perguntasRepository.create({
      ...pergunta,
    });
    const savedPergunta = await this.perguntasRepository.save(createdPergunta);
    return savedPergunta;
  }
}
