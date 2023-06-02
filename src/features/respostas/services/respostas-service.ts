import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationType } from 'src/features/core/types/pagination-type';
import { Pergunta } from 'src/features/perguntas/models/pergunta-model';
import { PerguntasService } from 'src/features/perguntas/services/perguntas-service';
import { Questionario } from 'src/features/questionarios/models/questionario-model';
import { DataSource, Repository } from 'typeorm';
import { Resposta } from '../models/resposta-model';
import { PerguntasWithRespostasType } from '../types/perguntas-with-respostas-type';

@Injectable()
export class RespostasService {
  constructor(
    @InjectRepository(Resposta)
    private respostasRepository: Repository<Resposta>,
    @InjectRepository(Pergunta)
    private perguntasRepository: Repository<Pergunta>,
    // private questionariosService: QuestionariosService,
    private readonly perguntasService: PerguntasService,
    private dataSource: DataSource,
  ) {}

  async findAll(
    formId: string,
    pagination: PaginationType,
  ): Promise<PerguntasWithRespostasType> {
    const questionarioRepository = this.dataSource.getRepository(Questionario);

    const questionario = await questionarioRepository.findOne({
      where: {
        cod: formId,
      },
      relations: ['perguntas', 'perguntas.respostas'],
    });

    if (!questionario) {
      throw new HttpException(
        'Questionário não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    const respostasPorPergunta = questionario.perguntas.map(
      (pergunta: Pergunta) => {
        return {
          pergunta: pergunta.cod,
          descricaoDaPergunta: pergunta.descricao,
          indexNoQuestionario: pergunta.indexNoQuestionario,
          descricaoPergunta: pergunta.descricao,
          respostas: pergunta.respostas.map((resposta: Resposta) => ({
            descricao: resposta.descricao,
            data: resposta.data,
            usuario: resposta.usuario,
          })),
        };
      },
    );

    return respostasPorPergunta;
  }

  async findById(id: string): Promise<Resposta> {
    const searchedResposta = await this.respostasRepository.findOneBy({
      cod: id,
    });
    if (!searchedResposta) {
      throw new HttpException(
        'A resposta não foi encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }
    return searchedResposta;
  }

  async create(formId: string, resposta: Resposta): Promise<Resposta> {
    const date = new Date();
    const createdResposta = await this.respostasRepository.create({
      // MOCKED USER ID
      usuario: '5d0b4214-6e89-4a31-be5b-0948f9b5c829',
      data: date,
      ...resposta,
    });
    await this.respostasRepository.save(createdResposta);
    // PostgreSQL saves with correct timezone,
    // but JavaScript shows +3 in output,
    // so I need to fix this in the response body,
    // but not when saving in the table
    date.setUTCHours(date.getUTCHours() - 3);
    return { ...createdResposta, data: date };
  }

  async putById(answerId: string, resposta: Resposta): Promise<Resposta> {
    const existingResposta = await this.findById(answerId);
    const newResposta = this.respostasRepository.merge(
      existingResposta,
      resposta,
    );
    return this.respostasRepository.save(newResposta);
  }

  async deleteById(answerId: string): Promise<string> {
    await this.findById(answerId);
    await this.respostasRepository.delete({ cod: answerId });
    return `A resposta de id ${answerId} excluída com sucesso.`;
  }
}
