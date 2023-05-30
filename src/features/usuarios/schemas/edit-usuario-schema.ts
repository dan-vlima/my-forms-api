import { BaseSchema } from 'src/features/core/schemas/base-schema';
import { CreateUsuarioSchema } from './create-usuario-schema';

export type EditUsuarioSchema = CreateUsuarioSchema & BaseSchema;
