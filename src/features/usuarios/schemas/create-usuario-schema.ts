import { IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioSchema {
  @IsNotEmpty()
  nome: string;

  @Length(8, 20)
  @IsNotEmpty()
  senha: string;

  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;
}
