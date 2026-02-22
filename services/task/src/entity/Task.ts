
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstname!: string

}
