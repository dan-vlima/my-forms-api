import { BaseModel } from 'src/features/core/models/base-model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario extends BaseModel {
  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  cpf: string;

  // @OneToMany(() => Questionario, (questionario) => questionario.codUsuario)
  // @JoinColumn({ name: 'cod_usuario' })
  // questionarios?: Questionario[];

  // @OneToMany(() => Resposta, (resposta) => resposta.codUsuario)
  // respostas?: Resposta[];
}
