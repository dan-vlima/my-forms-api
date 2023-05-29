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
import { Usuario } from '../models/usuario-model';
import { UsuariosService } from '../services/usuarios-service';

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
    status: HttpStatus.FORBIDDEN,
    description: 'Operação não permitida.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
  })
  async create() {
    return this.usuariosService.create();
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
  async findAll() {
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
  async findById(@Param() params): Promise<Partial<Usuario>> {
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
  async putById(@Param() params): Promise<Usuario> {
    return this.usuariosService.putById(params.id);
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
  async patchById(@Param() params): Promise<Usuario> {
    return this.usuariosService.patchById(params.id);
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
  async deleteById(@Param() params): Promise<void> {
    return this.usuariosService.deleteById(params.id);
  }
}
