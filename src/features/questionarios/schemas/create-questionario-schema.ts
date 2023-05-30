import { IsNotEmpty } from 'class-validator';

export class CreateQuestionarioSchema {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  cod_usuario: string;
}
