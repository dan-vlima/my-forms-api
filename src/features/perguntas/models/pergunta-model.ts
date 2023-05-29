import { BaseModel } from 'src/features/core/models/base-model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Pergunta extends BaseModel {
  @Column()
  descricao: string;

  @Column()
  cod_perg: string;
}
