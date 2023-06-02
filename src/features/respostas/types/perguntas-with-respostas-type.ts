import { Usuario } from 'src/features/usuarios/models/usuario-model';

export type PerguntasWithRespostasType = {
  pergunta: string;
  respostas: { descricao: string; data: Date; usuario: Usuario }[];
}[];
