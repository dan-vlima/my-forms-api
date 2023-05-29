import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Resposta } from '../models/resposta-model';

@Injectable()
export class RespostasService {
  constructor(
    @InjectRepository(Resposta)
    private respostasRepository: Repository<Resposta>,
    private dataSource: DataSource,
  ) {}

  async findAll(formId: string): Promise<Resposta[]> {
    return Promise.resolve([
      {
        cod: 'e4b4f769-f5da-490a-881e-20cd154b4a57',
        data: new Date(),
        descricao: 'Uma descrição',
        cod_pergunta: formId,
      },
    ]);
  }

  async create(formId: string): Promise<Resposta> {
    return await Promise.resolve({
      cod: 'e4b4f769-f5da-490a-881e-20cd154b4a57',
      data: new Date(),
      descricao: 'Uma descrição',
      cod_pergunta: formId,
    });
  }

  async putById(formId: string, answerId: string): Promise<Resposta> {
    return Promise.resolve({
      cod: answerId,
      data: new Date(),
      descricao: 'Uma descrição',
      cod_pergunta: formId,
    });
  }

  async deleteById(answerId: string) {
    null;
  }
}
