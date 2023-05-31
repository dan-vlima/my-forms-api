import { IsNotEmpty } from 'class-validator';

export class CreatePerguntaSchema {
  @IsNotEmpty()
  index_no_questionario: number;

  @IsNotEmpty()
  descricao: string;
}
