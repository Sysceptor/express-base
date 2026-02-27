import { Column, Entity, OneToMany, OneToOne } from "typeorm";

import { BaseEntity } from "../../../../shared/baseEntities/baseEntity.ts";
import { UserGender } from "../../src/helper/enums/index.ts";
import { AuthEntity } from "./Auth.entity.ts";
import { AuthSessionEntity } from "./AuthSession.entity.ts";

@Entity("users")
export class UserEntity extends BaseEntity {
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

  @OneToOne(() => AuthEntity, (auth) => auth.user)
  declare auth: AuthEntity;

  @OneToMany(() => AuthSessionEntity, (session) => session.user)
  declare sessions: AuthSessionEntity[];
}
