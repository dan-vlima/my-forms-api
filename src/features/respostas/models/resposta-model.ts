import { BaseModel } from 'src/features/core/models/base-model';
import { Pergunta } from 'src/features/perguntas/models/pergunta-model';
import { Usuario } from 'src/features/usuarios/models/usuario-model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Resposta extends BaseModel {
  @Column()
  descricao: string;

  @Column({ type: 'timestamptz' })
  data: Date;

  @ManyToOne(() => Pergunta)
  @JoinColumn()
  cod_pergunta: string;

  @ManyToOne(() => Usuario)
  @JoinColumn()
  cod_usuario: string;
}
