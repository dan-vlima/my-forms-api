import { BaseModel } from 'src/features/core/models/base-model';
import { Pergunta } from 'src/features/perguntas/models/pergunta-model';
import { Usuario } from 'src/features/usuarios/models/usuario-model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'respostas' })
export class Resposta extends BaseModel {
  @Column()
  descricao: string;

  @Column({ type: 'timestamptz' })
  data: Date;

  @ManyToOne(() => Pergunta)
  @JoinColumn({ name: 'cod_pergunta' })
  cod_pergunta: string;

  @Column()
  cod_usuario: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'cod_usuario' })
  usuario: Usuario;

  // @ManyToOne(() => Pergunta, (pergunta) => pergunta.respostas)
  // pergunta: Pergunta;

  // @ManyToOne(() => Usuario, (usuario) => usuario.respostas)
  // usuario: Usuario;
}
