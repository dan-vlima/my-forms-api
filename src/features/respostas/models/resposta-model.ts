import { BaseModel } from 'src/features/core/models/base-model';
import { Questionario } from 'src/features/questionarios/models/questionario-model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Resposta extends BaseModel {
  @Column()
  descricao: string;

  @Column({ type: 'timestamptz' })
  data: Date;

  @ManyToOne(() => Questionario)
  @JoinColumn()
  cod_questionario: string;
}
