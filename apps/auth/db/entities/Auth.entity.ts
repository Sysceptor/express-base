import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { BaseEntity } from "../../../../shared/baseEntities/baseEntity.ts";
import { UserEntity } from "./User.entity.ts";

@Entity("Auth")
export class AuthEntity extends BaseEntity {
  @Column({ select: false })
  declare password: string;

  @Column({ select: false, nullable: true })
  declare refreshTokenHash: string | undefined;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) return;
    if (this.password.startsWith("$2b$")) return;

    const saltRounds = Number(process.env.BCRYPT_ROUNDS);
    const pepper = process.env.PASSWORD_PEPPER;

    this.password = await bcrypt.hash(this.password + pepper, saltRounds);
  }

  async isValidPassword(plain: string): Promise<boolean> {
    const pepper = process.env.PASSWORD_PEPPER;
    return bcrypt.compare(plain + pepper, this.password);
  }

  generateAccessToken(): string {
    if (!this.user?.id) {
      throw new Error("User relation not loaded");
    }

    return jwt.sign({ userId: this.user.id }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });
  }

  generateRefreshToken(): string {
    if (!this.user?.id) {
      throw new Error("User relation not loaded");
    }

    return jwt.sign({ userId: this.user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

  async setRefreshToken(token: string): Promise<void> {
    const saltRounds = Number(process.env.BCRYPT_ROUNDS);
    this.refreshTokenHash = await bcrypt.hash(token, saltRounds);
  }

  async isValidRefreshToken(token: string): Promise<boolean> {
    if (!this.refreshTokenHash) return false;
    return bcrypt.compare(token, this.refreshTokenHash);
  }

  clearRefreshToken(): void {
    this.refreshTokenHash = undefined;
  }

  @OneToOne(() => UserEntity, (user) => user.auth, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  declare user: UserEntity;
}
