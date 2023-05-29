import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BaseModel {
  @PrimaryColumn({ type: 'uuid', unique: true })
  cod: string;
}
