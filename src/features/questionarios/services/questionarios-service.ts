import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerguntasService } from 'src/features/perguntas/services/perguntas-service';
import { UsuariosService } from 'src/features/usuarios/services/usuarios-service';
import { DataSource, Repository } from 'typeorm';
import { Questionario } from '../models/questionario-model';
import { CreateQuestionarioSchema } from '../schemas/create-questionario-schema';
import { EditQuestionarioSchema } from '../schemas/edit-questionario-schema';
import { QuestionarioType } from '../types/questionario-type';
import { QuestionarioWithPerguntas } from '../types/questionario-with-perguntas';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectRepository(Questionario)
    private questionariosRepository: Repository<Questionario>,
    private readonly usuariosService: UsuariosService,
    private readonly perguntasService: PerguntasService,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Questionario[]> {
    const questionarios = await this.questionariosRepository.find({
      relations: ['perguntas'],
      take: limit,
      skip: (page - 1) * limit,
    });
    return questionarios;
  }

  async create(
    questionario: CreateQuestionarioSchema,
  ): Promise<QuestionarioWithPerguntas> {
    await this.usuariosService.findById(questionario.usuario);
    const date = new Date();
    const createdForm = this.questionariosRepository.create({
      ...questionario,
      data: date,
    });
    await this.questionariosRepository.save(createdForm);
    // PostgreSQL saves with correct timezone,
    // but JavaScript shows +3 in output,
    // so I need to fix this in the response body,
    // but not when saving in the table
    date.setUTCHours(date.getUTCHours() - 3);
    const { perguntas } = questionario;
    const createdPerguntas = await Promise.all(
      perguntas.map(
        async (pergunta) =>
          await this.perguntasService.create({
            questionario: createdForm.cod,
            ...pergunta,
          }),
      ),
    );
    return { ...createdForm, data: date, perguntas: createdPerguntas };
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
    questionario: QuestionarioType,
  ): Promise<Questionario> {
    await this.findById(id);
    await this.usuariosService.findById(questionario.usuario);
    const editedForm = await this.questionariosRepository.save(questionario);
    return editedForm;
  }

  async patchById(
    id: string,
    questionario: EditQuestionarioSchema,
  ): Promise<Questionario> {
    await this.findById(id);
    await this.usuariosService.findById(questionario.usuario);
    const editedForm = await this.questionariosRepository.save(questionario);
    return editedForm;
  }

  async deleteById(id: string): Promise<string> {
    await this.findById(id);
    await this.questionariosRepository.delete(id);
    return `Formulário de id ${id} excluído com sucesso.`;
  }
}
