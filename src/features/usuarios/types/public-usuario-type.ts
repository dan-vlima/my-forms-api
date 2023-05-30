import { Usuario } from '../models/usuario-model';

export type PublicUsuarioType = Omit<Usuario, 'senha'>;
