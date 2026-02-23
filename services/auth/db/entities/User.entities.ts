import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../../shared/baseEntities/baseEntity.ts";
import { UserGender } from "../../src/enums/index.ts";

@Entity()
export class UserDetails extends BaseEntity {
  @Column({ type: "varchar", length: 200 })
  declare firstName: string;

  @Column({ type: "varchar", length: 200 })
  declare lastName: string;

  @Column({ type: "varchar", length: 200, unique: true })
  declare email: string;

  @Column({
    type: "enum",
    enum: UserGender,
    default: UserGender.PREFER_NOT_TO_SAY,
    nullable: true,
  })
  declare role: UserGender;
}
