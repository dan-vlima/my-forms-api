import { BaseModel } from 'src/features/core/models/base-model';
import { Pergunta } from 'src/features/perguntas/models/pergunta-model';
import { Usuario } from 'src/features/usuarios/models/usuario-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'questionarios' })
export class Questionario extends BaseModel {
  @CreateDateColumn()
  data: Date;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'cod_usuario' })
  usuario: Usuario;

  @OneToMany(() => Pergunta, (pergunta) => pergunta.questionario)
  perguntas: Pergunta[];
}
