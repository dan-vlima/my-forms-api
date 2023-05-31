import { UsuarioType } from './usuario-type';

export type PublicUsuarioType = Omit<UsuarioType, 'senha'>;
