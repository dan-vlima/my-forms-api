import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/features/usuarios/services/usuarios-service';
import { Repository } from 'typeorm';
import { Questionario } from '../models/questionario-model';
import { CreateQuestionarioSchema } from '../schemas/create-questionario-schema';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectRepository(Questionario)
    private questionariosRepository: Repository<Questionario>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async findAll(): Promise<Questionario[]> {
    return await this.questionariosRepository.find();
  }

  async create(questionario: CreateQuestionarioSchema): Promise<Questionario> {
    await this.usuariosService.findById(questionario.cod_usuario);
    const date = new Date();
    const createdForm = await this.questionariosRepository.create({
      data: date,
      ...questionario,
    });
    await this.questionariosRepository.save(createdForm);
    // PostgreSQL saves with correct timezone,
    // but JavaScript shows +3 in output,
    // so I need to fix this in the response body,
    // but not when saving in the table
    date.setUTCHours(date.getUTCHours() - 3);
    return { ...createdForm, data: date };
  }

  async findById(id: string): Promise<Questionario> {
    const searchedForm = await this.questionariosRepository.findOneBy({
      cod: id,
    });
    if (!searchedForm) {
      throw new HttpException(
        'O questionário não foi encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return searchedForm;
  }

  async putById(
    id: string,
    questionario: CreateQuestionarioSchema,
  ): Promise<Questionario> {
    await this.findById(id);
    await this.usuariosService.findById(questionario.cod_usuario);
    const editedForm = await this.questionariosRepository.merge(
      {
        ...questionario,
      } as Questionario,
      { cod: id },
    );
    await this.questionariosRepository.save(editedForm);
    return editedForm;
  }

  async patchById(
    id: string,
    questionario: CreateQuestionarioSchema,
  ): Promise<Questionario> {
    await this.findById(id);
    await this.usuariosService.findById(questionario.cod_usuario);
    const editedForm = await this.questionariosRepository.merge(
      {
        ...questionario,
      } as Questionario,
      { cod: id },
    );
    await this.questionariosRepository.save(editedForm);
    return editedForm;
  }

  async deleteById(id: string): Promise<string> {
    await this.findById(id);
    await this.questionariosRepository.delete(id);
    return `Formulário de id ${id} excluído com sucesso.`;
  }
}
