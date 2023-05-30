import { BaseModel } from 'src/features/core/models/base-model';
import { Questionario } from 'src/features/questionarios/models/questionario-model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario extends BaseModel {
  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column({ unique: true })
  cpf: string;

  @OneToMany(() => Questionario, (questionario) => questionario.cod_usuario)
  questionarios?: Questionario[];
}
