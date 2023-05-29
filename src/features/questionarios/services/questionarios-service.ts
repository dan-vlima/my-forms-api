import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Questionario } from '../models/questionario-model';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectRepository(Questionario)
    private questionariosRepository: Repository<Questionario>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Questionario[]> {
    return Promise.resolve([
      {
        cod: '9080c24f-87e3-4133-9119-460294a2d789',
        data: new Date(),
        nome: 'Um questionário',
        descricao: 'Uma descrição',
        cod_usuario: '3ab1186b-0062-4b2a-890d-99d31ae9d24f',
      },
    ]);
  }

  async create(): Promise<Questionario> {
    return Promise.resolve({
      cod: '9080c24f-87e3-4133-9119-460294a2d789',
      data: new Date(),
      nome: 'Um questionário',
      descricao: 'Uma descrição',
      cod_usuario: '3ab1186b-0062-4b2a-890d-99d31ae9d24f',
    });
  }

  async findById(id: string): Promise<Questionario> {
    return Promise.resolve({
      cod: '9080c24f-87e3-4133-9119-460294a2d789',
      data: new Date(),
      nome: 'Um questionário',
      descricao: 'Uma descrição',
      cod_usuario: '3ab1186b-0062-4b2a-890d-99d31ae9d24f',
    });
  }

  async putById(id: string): Promise<Questionario> {
    return Promise.resolve({
      cod: '9080c24f-87e3-4133-9119-460294a2d789',
      data: new Date(),
      nome: 'Um questionário',
      descricao: 'Uma descrição',
      cod_usuario: '3ab1186b-0062-4b2a-890d-99d31ae9d24f',
    });
  }

  async patchById(id: string): Promise<Questionario> {
    return Promise.resolve({
      cod: '9080c24f-87e3-4133-9119-460294a2d789',
      data: new Date(),
      nome: 'Um questionário',
      descricao: 'Uma descrição',
      cod_usuario: '3ab1186b-0062-4b2a-890d-99d31ae9d24f',
    });
  }

  async deleteById(id: string) {
    null;
  }
}
