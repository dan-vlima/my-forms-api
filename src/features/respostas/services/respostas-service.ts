import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationType } from 'src/features/core/types/pagination-type';
import { Pergunta } from 'src/features/perguntas/models/pergunta-model';
import { PerguntasService } from 'src/features/perguntas/services/perguntas-service';
import { DataSource, Repository } from 'typeorm';
import { Resposta } from '../models/resposta-model';

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

  async findAll(formId: string, pagination: PaginationType): Promise<any> {
    // const questionarioRepository = await this.dataSource.getRepository(
    //   Questionario,
    // );
    // const questionario = await questionarioRepository.findOne({
    //   where: {
    //     cod: formId,
    //   },
    //   relations: ['perguntas', 'perguntas.respostas'],
    // });
    // const perguntasERespostas = questionario.perguntas.map((pergunta) => ({
    //   pergunta,
    //   resposta: pergunta.respostas.find(
    //     (resposta) => resposta.cod_usuario === questionario.cod_usuario,
    //   ),
    // }));
    // const startIndex = (pagination.page - 1) * pagination.limit;
    // const endIndex = startIndex + pagination.limit;
    // const paginatedPerguntasERespostas = perguntasERespostas.slice(
    //   startIndex,
    //   endIndex,
    // );
    // const totalItems = perguntasERespostas.length;
    // const totalPages = Math.ceil(totalItems / pagination.limit);
    // return {
    //   data: paginatedPerguntasERespostas,
    //   page: pagination.page,
    //   limit: pagination.limit,
    //   totalItems,
    //   totalPages,
    // };
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

  async putById(
    formId: string,
    answerId: string,
    resposta: Resposta,
  ): Promise<Resposta> {
    await this.findById(answerId);
    const newResposta = this.respostasRepository.merge(resposta);
    return this.respostasRepository.save(newResposta);
  }

  async deleteById(answerId: string): Promise<string> {
    await this.findById(answerId);
    await this.respostasRepository.delete({ cod: answerId });
    return `A resposta de id ${answerId} excluída com sucesso.`;
  }
}
