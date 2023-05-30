import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from '../models/usuario-model';
import { CreateUsuarioSchema } from '../schemas/create-usuario-schema';
import { EditUsuarioSchema } from '../schemas/edit-usuario-schema';
import { PublicUsuarioType } from '../types/public-usuario-type';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<PublicUsuarioType[]> {
    const foundUsers = await this.usuariosRepository.find();
    const publicUsers = foundUsers.map(({ cod, nome, cpf }) => {
      return { cod, nome, cpf };
    });
    return publicUsers;
  }

  async create(
    usuario: CreateUsuarioSchema,
  ): Promise<Omit<PublicUsuarioType, 'cod'>> {
    const createdUser = await this.usuariosRepository.create(usuario);
    await this.usuariosRepository.save(createdUser);
    const { nome, cpf } = createdUser;
    return { nome, cpf };
  }

  async findById(id: string): Promise<PublicUsuarioType> {
    const searchedUser = await this.usuariosRepository.findOneBy({ cod: id });
    if (!searchedUser) {
      throw new HttpException(
        'O usuário não foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    const { cod, nome, cpf } = searchedUser;
    return { cod, nome, cpf };
  }

  async putById(
    id: string,
    usuario: EditUsuarioSchema,
  ): Promise<PublicUsuarioType> {
    await this.findById(id);
    const editedUser = await this.usuariosRepository.merge(
      {
        ...usuario,
      },
      { cod: id },
    );
    await this.usuariosRepository.save(editedUser);
    const { cod, nome, cpf } = editedUser;
    return { cod, nome, cpf };
  }

  async patchById(
    id: string,
    usuario: Partial<CreateUsuarioSchema>,
  ): Promise<PublicUsuarioType> {
    await this.findById(id);
    const editedUser = await this.usuariosRepository.merge(
      {
        ...usuario,
      } as Usuario,
      { cod: id },
    );
    await this.usuariosRepository.save(editedUser);
    const { cod, nome, cpf } = editedUser;
    return { cod, nome, cpf };
  }

  async deleteById(id: string): Promise<string> {
    await this.findById(id);
    await this.usuariosRepository.delete(id);
    return `O usuário de id ${id} foi excluído com sucesso.`;
  }
}
