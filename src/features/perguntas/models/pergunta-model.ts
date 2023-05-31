import { BaseModel } from 'src/features/core/models/base-model';
import { Questionario } from 'src/features/questionarios/models/questionario-model';
import { Resposta } from 'src/features/respostas/models/resposta-model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'perguntas' })
export class Pergunta extends BaseModel {
  @Column()
  descricao: string;

  @ManyToOne(() => Questionario)
  @JoinColumn({ name: 'cod_questionario' })
  cod_questionario: string;

  @Column({ name: 'index_no_questionario', type: 'smallint' })
  index_no_questionario: number;

  @OneToMany(() => Resposta, (resposta) => resposta.cod_pergunta)
  respostas?: Resposta[];

  // @ManyToOne(() => Questionario, (questionario) => questionario.perguntas)
  // questionario?: Questionario;
}
