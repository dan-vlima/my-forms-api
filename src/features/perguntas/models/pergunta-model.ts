import { BaseModel } from 'src/features/core/models/base-model';
import { Questionario } from 'src/features/questionarios/models/questionario-model';
import { Resposta } from 'src/features/respostas/models/resposta-model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'perguntas' })
export class Pergunta extends BaseModel {
  @Column()
  descricao: string;

  @Column({ name: 'index_no_questionario', type: 'smallint' })
  indexNoQuestionario: number;

  @OneToMany(() => Resposta, (resposta) => resposta.pergunta)
  respostas?: Resposta[];

  @ManyToOne(() => Questionario, (questionario) => questionario.perguntas)
  @JoinColumn({ name: 'cod_questionario' })
  @ManyToOne(() => Questionario)
  questionario: Questionario;
}
