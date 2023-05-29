import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QUESTIONARIOS_ROUTE_PATH } from '../constants/questionarios-router-path';
import { Questionario } from '../models/questionario-model';
import { QuestionariosService } from '../services/questionarios-service';

@ApiTags('Questionários')
@Controller(QUESTIONARIOS_ROUTE_PATH)
export class QuestionariosController {
  constructor(private readonly questionariosService: QuestionariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo questionário.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Questionário criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Operação não permitida.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async create() {
    return this.questionariosService.create();
  }

  @Get()
  @ApiOperation({ summary: 'Encontra todos os questionários.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questionários encontrados com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Questionários não encontrados.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async findAll() {
    return this.questionariosService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do questionário',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Encontra um questionário pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questionário encontrado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O questionário não foi encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async findById(@Param() params): Promise<Partial<Questionario>> {
    return this.questionariosService.findById(params.id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do questionário',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary:
      'Modifica totalmente um questionário pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questionário editado com sucesso.',
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
  async putById(@Param() params): Promise<Questionario> {
    return this.questionariosService.putById(params.id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do questionário',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary:
      'Modifica parcialmente um questionário pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questionário modificado com sucesso.',
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
  async patchById(@Param() params): Promise<Questionario> {
    return this.questionariosService.patchById(params.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do questionário',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Exclui um questionário pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questionário excluído com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O questionário não foi encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async deleteById(@Param() params): Promise<void> {
    return this.questionariosService.deleteById(params.id);
  }
}
