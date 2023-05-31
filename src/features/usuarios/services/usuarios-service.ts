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

  async findAll(page = 1, limit = 10): Promise<PublicUsuarioType[]> {
    const foundUsers = await this.usuariosRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
    const publicUsers = foundUsers.map(({ cod, nome, cpf }) => {
      return { cod, nome, cpf };
    });
    return publicUsers;
  }

  async create(usuario: CreateUsuarioSchema): Promise<PublicUsuarioType> {
    await this.validateCPF(usuario.cpf);
    const createdUser = await this.usuariosRepository.create(usuario);
    await this.usuariosRepository.save(createdUser);
    const { cod, nome, cpf } = createdUser;
    return { cod, nome, cpf };
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

  async validateCPF(cpf: string): Promise<boolean> {
    const regex = /^\d{11}$/;
    const isCPFCorrectlyFormatted = regex.test(cpf);
    if (!isCPFCorrectlyFormatted) {
      throw new HttpException(
        'O CPF deve ter exatamente 11 dígitos com caracteres de 1 a 9.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isCPFNotUnique = await this.usuariosRepository.findOneBy({
      cpf: cpf,
    });
    if (isCPFNotUnique) {
      throw new HttpException(
        'Já existe um usuário cadastrado com o mesmo CPF.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return false;
  }
}
