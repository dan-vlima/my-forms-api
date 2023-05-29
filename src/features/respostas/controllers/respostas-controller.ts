import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    description:
      'Código do questionário ao qual a resposta criada ficará vinculada.',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Cria uma nova resposta a um questionário.' })
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
  async create(
    @Param() params: Omit<RespostasControllerParams, 'answerId'>,
  ): Promise<Resposta> {
    return await this.respostasService.create(params.formId);
  }

  @Get('/:formId/respostas')
  @ApiParam({
    name: 'formId',
    description:
      'Código do questionário ao qual as respostas buscadas estão vinculadas.',
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
  async findAll(@Param() params: Omit<RespostasControllerParams, 'answerId'>) {
    return this.respostasService.findAll(params.formId);
  }

  @Put('/:formId/respostas/:answerId')
  @ApiParam({
    name: 'id',
    description:
      'Código do questionário ao qual a resposta editada está vinculada.',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'id',
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
  async putById(@Param() params: RespostasControllerParams): Promise<Resposta> {
    return this.respostasService.putById(params.formId, params.answerId);
  }

  @Delete('/:formId/respostas/:answerId')
  @ApiParam({
    name: 'formId',
    description:
      'Código do questionário ao qual a resposta excluída está vinculada.',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'id',
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
  async deleteById(@Param() params: RespostasControllerParams): Promise<void> {
    return this.respostasService.deleteById(params.answerId);
  }
}
