import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { QUESTIONARIOS_ROUTE_PATH } from '../constants/questionarios-router-path';
import { Questionario } from '../models/questionario-model';
import { QuestionariosService } from '../services/questionarios-service';

@ApiTags('Questionários')
@Controller(QUESTIONARIOS_ROUTE_PATH)
export class QuestionariosController {
  constructor(private readonly questionariosService: QuestionariosService) {}

  @Post()
  @ApiParam({
    name: 'id',
    description: 'Código do usuário que está criando o questionário.',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Cria um novo questionário.' })
  @ApiBody({
    description: 'Questionário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string',
          example: 'Enquete 1',
          description: 'O nome do questionário',
        },
        descricao: {
          type: 'string',
          example: 'Esta é uma descrição do questionário.',
          description: 'A descrição do questionário.',
        },
        perguntas: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              indexNoQuestionario: {
                type: 'number',
                example: 1,
                description:
                  'A posição da pergunta no questionário. Por exemplo, se ela foi a primeira pergunta, o indexNoQuestionario é 0.',
              },
              descricao: {
                type: 'string',
                example: 'Qual o endereço do seu domicílio?',
                description: 'A descrição da pergunta.',
              },
            },
          },
        },
      },
    },
  })
  async create(
    @Param() id: string,
    @Body() questionario: Questionario,
  ): Promise<Questionario> {
    return this.questionariosService.create(id, questionario);
  }

  @Get()
  @ApiOperation({ summary: 'Encontra todos os questionários.' })
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
    description: 'Número de questionários por página',
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Questionario[]> {
    return this.questionariosService.findAll(page, limit);
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
  async findById(@Param() params): Promise<Questionario> {
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
  @ApiBody({
    description: 'Questionário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          example: '2023-05-30T18:38:03.363Z',
          description: 'O nome do questionário',
        },
        nome: {
          type: 'string',
          example: 'Enquete 1',
          description: 'O nome do questionário',
        },
        descricao: {
          type: 'string',
          example: 'Esta é uma descrição do questionário.',
          description: 'A descrição do questionário.',
        },
        usuario: {
          type: 'string',
          example: '04372415-41c8-4ff9-893e-313b5385d59c',
          description:
            'O identificador único do usuário que criou o questionário',
        },
      },
    },
  })
  async putById(
    @Param() params,
    @Body() questionario: Questionario,
  ): Promise<Questionario> {
    return this.questionariosService.putById(params.id, questionario);
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
  @ApiBody({
    description: 'Questionário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          example: '2023-05-30T18:38:03.363Z',
          description: 'O nome do questionário',
        },
        nome: {
          type: 'string',
          example: 'Enquete 1',
          description: 'O nome do questionário',
        },
        descricao: {
          type: 'string',
          example: 'Esta é uma descrição do questionário.',
          description: 'A descrição do questionário.',
        },
        usuario: {
          type: 'string',
          example: '04372415-41c8-4ff9-893e-313b5385d59c',
          description:
            'O identificador único do usuário que criou o questionário',
        },
      },
    },
  })
  async patchById(
    @Param() params,
    @Body() questionario: Questionario,
  ): Promise<Questionario> {
    return this.questionariosService.patchById(params.id, questionario);
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
  async deleteById(@Param() params): Promise<string> {
    return this.questionariosService.deleteById(params.id);
  }
}
