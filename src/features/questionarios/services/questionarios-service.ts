import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pergunta } from 'src/features/perguntas/models/pergunta-model';
import { PerguntasService } from 'src/features/perguntas/services/perguntas-service';
import { UsuariosService } from 'src/features/usuarios/services/usuarios-service';
import { DataSource, Repository } from 'typeorm';
import { Questionario } from '../models/questionario-model';
import { QuestionarioWithPerguntas } from '../types/questionario-with-perguntas';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectRepository(Questionario)
    private questionariosRepository: Repository<Questionario>,
    private readonly usuariosService: UsuariosService,
    private readonly perguntasService: PerguntasService,
    @InjectRepository(Pergunta)
    private perguntasRepository: Repository<Pergunta>,
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
    id: string,
    questionario: Questionario,
  ): Promise<QuestionarioWithPerguntas> {
    // MOCKED USER ID
    await this.usuariosService.findById('5d0b4214-6e89-4a31-be5b-0948f9b5c829');
    const date = new Date();
    const createdForm = this.questionariosRepository.create({
      // MOCKED USER ID
      usuario: '5d0b4214-6e89-4a31-be5b-0948f9b5c829',
      data: date,
      ...questionario,
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
    const searchedForm = await this.questionariosRepository.findOne({
      relations: ['perguntas'],
      where: {
        cod: id,
      },
    });
    if (!searchedForm) {
      throw new HttpException(
        'O questionário não foi encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return searchedForm;
  }

  async putById(id: string, questionario: Questionario): Promise<Questionario> {
    const questionarioExistente = await this.findById(id);

    if (questionario.perguntas && questionario.perguntas.length > 0) {
      for (const pergunta of questionario.perguntas) {
        const perguntaExistente = questionarioExistente.perguntas.find(
          (p) => p.cod === pergunta.cod,
        );
        if (perguntaExistente) {
          Object.assign(perguntaExistente, pergunta);
          await this.perguntasRepository.save(perguntaExistente);
        } else {
          const novaPergunta = this.perguntasRepository.create({
            ...pergunta,
            questionario: questionarioExistente,
          });
          questionarioExistente.perguntas.push(novaPergunta);
          await this.perguntasRepository.save(novaPergunta);
        }
      }
    }

    if (questionario.nome) {
      questionarioExistente.nome = questionario.nome;
    }
    if (questionario.descricao) {
      questionarioExistente.descricao = questionario.descricao;
    }

    const editedForm = await this.questionariosRepository.save(
      questionarioExistente,
    );

    const date = new Date();
    date.setUTCHours(date.getUTCHours() - 3);
    return { data: date, ...editedForm };
  }

  async patchById(
    id: string,
    questionario: Questionario,
  ): Promise<Questionario> {
    const questionarioExistente = await this.findById(id);

    if (questionario.perguntas && questionario.perguntas.length > 0) {
      for (const pergunta of questionario.perguntas) {
        const perguntaExistente = questionarioExistente.perguntas.find(
          (p) => p.cod === pergunta.cod,
        );
        if (perguntaExistente) {
          Object.assign(perguntaExistente, pergunta);
          await this.perguntasRepository.save(perguntaExistente);
        } else {
          const novaPergunta = this.perguntasRepository.create({
            ...pergunta,
            questionario: questionarioExistente,
          });
          questionarioExistente.perguntas.push(novaPergunta);
          await this.perguntasRepository.save(novaPergunta);
        }
      }
    }

    if (questionario.nome) {
      questionarioExistente.nome = questionario.nome;
    }
    if (questionario.descricao) {
      questionarioExistente.descricao = questionario.descricao;
    }

    const editedForm = await this.questionariosRepository.save(
      questionarioExistente,
    );

    return editedForm;
  }

  async deleteById(id: string): Promise<string> {
    await this.findById(id);
    await this.questionariosRepository.delete(id);
    return `Formulário de id ${id} excluído com sucesso.`;
  }
}
