import { IsNotEmpty } from 'class-validator';

export class BaseSchema {
  @IsNotEmpty()
  cod: string;
}
