import { IsDate, IsNotEmpty } from 'class-validator';
import { CreateQuestionarioSchema } from './create-questionario-schema';
export class EditQuestionarioSchema extends CreateQuestionarioSchema {
  @IsNotEmpty()
  cod: string;

  @IsDate()
  data: Date;
}
