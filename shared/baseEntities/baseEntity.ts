import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';

import { ulid } from 'ulid';


export class BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 26 })
  declare id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  declare readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  declare readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  declare deletedAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }
}