import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationType } from 'src/features/core/types/pagination-type';
import { QUESTIONARIOS_ROUTE_PATH } from 'src/features/questionarios/constants/questionarios-router-path';
import { Resposta } from '../models/resposta-model';
import { RespostasService } from '../services/respostas-service';
import { RespostasControllerParams } from '../types/respostas-controller-params';

@ApiTags('Respostas')
@Controller(QUESTIONARIOS_ROUTE_PATH)
export class RespostasController {
  constructor(private readonly respostasService: RespostasService) {}

  @Post('/:formId/respostas')
  @ApiParam({
    name: 'formId',
    description: 'Código do questionário ao qual a resposta pertence.',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Cria uma nova resposta a uma pergunta de um questionário',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Resposta criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Operação não permitida.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  @ApiBody({
    description: 'Questionário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        cod_pergunta: {
          type: 'string',
          example: 'ed5e4cd3-d4fd-4990-a8d2-e8d558d89342',
          description:
            'O identificador único do usuário ao qual a resposta ficará vinculada.',
        },
        usuario: {
          type: 'string',
          example: '82670030-4c2a-406b-95c2-4bcf172b6ecb',
          description:
            'O identificador único da pergunta a qual a resposta ficará vinculada.',
        },
        descricao: {
          type: 'string',
          example: 'Meu animal favorito é o gato.',
          description: 'Resposta a uma pergunta.',
        },
      },
    },
  })
  async create(
    @Param() params: Omit<RespostasControllerParams, 'answerId'>,
    @Body() resposta: Resposta,
  ): Promise<Resposta> {
    return await this.respostasService.create(params.formId, resposta);
  }

  @Get('/:formId/respostas')
  @ApiParam({
    name: 'formId',
    description:
      'Código do questionário ao qual as respostas buscadas pertencem.',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Encontra todas as respostas a um questionário.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Respostas encontradas com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Respostas não encontradas.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'Número de respostas por página',
  })
  async findAll(
    @Param() params: Omit<RespostasControllerParams, 'answerId'>,
    @Query()
    pagination: PaginationType = { page: 1, limit: 10 },
  ) {
    return this.respostasService.findAll(params.formId, pagination);
  }

  @Put('/:formId/respostas/:answerId')
  @ApiParam({
    name: 'formId',
    description: 'Código do questionário ao qual a resposta editada pertence.',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'answerId',
    description: 'Código da resposta editada.',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary:
      'Modifica totalmente uma resposta pelos identificadores únicos do questionário e da resposta.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Resposta editado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O questionário não foi encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description:
      'A entidade recebida não corresponde ao esperado pelo servidor.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  @ApiBody({
    description: 'Questionário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        usuario: {
          type: 'string',
          example: '82670030-4c2a-406b-95c2-4bcf172b6ecb',
          description:
            'O identificador único do usuário ao qual a pergunta está vinculada.',
        },
        cod_pergunta: {
          type: 'string',
          example: '82670030-4c2a-406b-95c2-4bcf172b6ecb',
          description:
            'O identificador único da pergunta a qual a resposta ficará vinculada.',
        },
        data: {
          type: 'string',
          example: '2023-05-31 11:26:09.879-03',
          description: 'A data na qual a resposta foi criada.',
        },
      },
    },
  })
  async putById(
    @Param() params: RespostasControllerParams,
    @Body() resposta: Resposta,
  ): Promise<Resposta> {
    return this.respostasService.putById(
      params.formId,
      params.answerId,
      resposta,
    );
  }

  @Delete('/:formId/respostas/:answerId')
  @ApiParam({
    name: 'formId',
    description: 'Código do questionário ao qual a resposta excluída pertence.',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'answerId',
    description: 'Código da resposta excluída.',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Exclui uma resposta pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Resposta excluído com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O questionário não foi encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async deleteById(
    @Param() params: RespostasControllerParams,
  ): Promise<string> {
    return this.respostasService.deleteById(params.answerId);
  }
}
