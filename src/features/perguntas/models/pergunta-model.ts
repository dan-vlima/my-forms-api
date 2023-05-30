import { BaseModel } from 'src/features/core/models/base-model';
import { Questionario } from 'src/features/questionarios/models/questionario-model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'perguntas' })
export class Pergunta extends BaseModel {
  @Column()
  descricao: string;

  @ManyToOne(() => Questionario)
  @JoinColumn()
  cod_questionario: string;
}
