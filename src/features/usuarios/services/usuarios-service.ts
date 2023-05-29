import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from '../models/usuario-model';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return Promise.resolve([
      {
        cod: '3ab1186b-0062-4b2a-890d-99d31ae9d24f',
        nome: 'Dan',
        senha: '123456',
        cpf: '123.456.789-10',
      },
    ]);
  }

  async create(): Promise<Usuario> {
    return Promise.resolve({
      cod: '3ab1186b-0062-4b2a-890d-99d31ae9d24f',
      nome: 'Dan',
      senha: '123456',
      cpf: '123.456.789-10',
    });
  }

  async findById(id: string): Promise<Partial<Usuario>> {
    return Promise.resolve({
      cod: id,
      nome: 'Dan',
      cpf: '123.456.789-10',
    });
  }

  async putById(id: string): Promise<Usuario> {
    return Promise.resolve({
      cod: id,
      nome: 'Dan',
      senha: '123456',
      cpf: '123.456.789-10',
    });
  }

  async patchById(id: string): Promise<Usuario> {
    return Promise.resolve({
      cod: id,
      nome: 'Dan',
      senha: '123456',
      cpf: '123.456.789-10',
    });
  }

  async deleteById(id: string) {
    null;
  }
}
