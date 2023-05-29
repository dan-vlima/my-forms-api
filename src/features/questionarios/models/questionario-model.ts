import { BaseModel } from 'src/features/core/models/base-model';
import { Usuario } from 'src/features/usuarios/models/usuario-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Questionario extends BaseModel {
  @CreateDateColumn()
  data: Date;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Usuario)
  @JoinColumn()
  cod_usuario: string;
}
