import bcrypt from "bcrypt";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "../../../../shared/baseEntities/baseEntity.ts";
import { UserEntity } from "./User.entity.ts";

@Entity("auth_sessions")
export class AuthSessionEntity extends BaseEntity {
  @Index()
  @ManyToOne(() => UserEntity, (user) => user.sessions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  declare user: UserEntity;

  @Column({ select: false })
  declare refreshToken: string;

  async setRefreshToken(token: string): Promise<void> {
    const saltRounds = Number(process.env.BCRYPT_ROUNDS);
    this.refreshToken = await bcrypt.hash(token, saltRounds);
  }

  async isValidRefreshToken(token: string): Promise<boolean> {
    return bcrypt.compare(token, this.refreshToken);
  }

  @Column({ nullable: true })
  declare deviceInfo: string;

  @Column({ nullable: true })
  declare ipAddress?: string;

  @Column({ type: "timestamptz" })
  declare expiresAt: Date;

  @Column({ type: "timestamptz", nullable: true })
  declare revokedAt: Date;

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  isRevoked(): boolean {
    return !!this.revokedAt;
  }

  revoke(): void {
    this.revokedAt = new Date();
  }
}
