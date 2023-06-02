import { Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class BaseModel {
  @Generated('uuid')
  @PrimaryColumn()
  cod: string;
}
