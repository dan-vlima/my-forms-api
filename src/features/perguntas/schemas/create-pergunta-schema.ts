import { IsNotEmpty } from 'class-validator';

export class CreatePerguntaSchema {
  @IsNotEmpty()
  indexNoQuestionario: number;

  @IsNotEmpty()
  descricao: string;
}
