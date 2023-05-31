import { Pergunta } from 'src/features/perguntas/models/pergunta-model';
import { Questionario } from '../models/questionario-model';

export type QuestionarioWithPerguntas = {
  perguntas: Pergunta[];
} & Questionario;
