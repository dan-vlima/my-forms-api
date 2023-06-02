import { IsArray, IsNotEmpty } from 'class-validator';
import { PerguntaType } from 'src/features/perguntas/types/pergunta-type';
export class CreateQuestionarioSchema {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  usuario: string;

  @IsArray()
  perguntas?: Omit<PerguntaType, 'cod'>[];
}
