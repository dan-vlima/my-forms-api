import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUsuarioSchema } from '../schemas/create-usuario-schema';
import { EditUsuarioSchema } from '../schemas/edit-usuario-schema';
import { UsuariosService } from '../services/usuarios-service';
import { PublicUsuarioType } from '../types/public-usuario-type';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description:
      'A entidade recebida não corresponde ao esperado pelo servidor.',
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
    description: 'Usuário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string',
          example: 'Dan',
          description: 'O nome do usuário',
        },
        cpf: {
          type: 'string',
          example: '12345678910',
          description: 'O CPF do usuário',
        },
        senha: {
          type: 'string',
          example: 'AyxUSZ#t6zC8i6Z$',
          description: 'A senha do usuário',
        },
      },
    },
  })
  async create(
    @Body() usuario: CreateUsuarioSchema,
  ): Promise<Omit<PublicUsuarioType, 'cod'>> {
    return this.usuariosService.create(usuario);
  }

  @Get()
  @ApiOperation({ summary: 'Encontra todos os usuários.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuários encontrados com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuários não encontrados.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async findAll(): Promise<PublicUsuarioType[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do usuário',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Encontra um usuário pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário encontrado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O usuário não foi encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async findById(@Param() params): Promise<PublicUsuarioType> {
    return this.usuariosService.findById(params.id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do usuário',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Modifica totalmente um usuário pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário editado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O usuário não foi encontrado',
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
    description: 'Usuário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string',
          example: 'Dan',
          description: 'O nome do usuário',
        },
        cpf: {
          type: 'string',
          example: '12345678910',
          description: 'O CPF do usuário',
        },
        senha: {
          type: 'string',
          example: 'AyxUSZ#t6zC8i6Z$',
          description: 'A senha do usuário',
        },
      },
    },
  })
  async putById(
    @Param() params,
    @Body() usuario: EditUsuarioSchema,
  ): Promise<PublicUsuarioType> {
    return this.usuariosService.putById(params.id, usuario);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do usuário',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Modifica parcialmente um usuário pelo seu identificador único.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário modificado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O usuário não foi encontrado',
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
    description: 'Usuário',
    required: true,
    isArray: false,
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string',
          example: 'Dan',
          description: 'O nome do usuário',
        },
        cpf: {
          type: 'string',
          example: '12345678910',
          description: 'O CPF do usuário',
        },
        senha: {
          type: 'string',
          example: 'AyxUSZ#t6zC8i6Z$',
          description: 'A senha do usuário',
        },
      },
    },
  })
  async patchById(
    @Param() params,
    @Body() usuario: Partial<CreateUsuarioSchema>,
  ): Promise<PublicUsuarioType> {
    return this.usuariosService.patchById(params.id, usuario);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Código do usuário',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Exclui um usuário pelo seu identificador único.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário excluído com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O usuário não foi encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async deleteById(@Param() params): Promise<string> {
    return this.usuariosService.deleteById(params.id);
  }
}
