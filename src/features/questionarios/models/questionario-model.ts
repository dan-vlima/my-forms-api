import { BaseModel } from 'src/features/core/models/base-model';
import { Usuario } from 'src/features/usuarios/models/usuario-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
  @JoinColumn({ name: 'cod_usuario', referencedColumnName: 'cod' })
  cod_usuario: string;
}
