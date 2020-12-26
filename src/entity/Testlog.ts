import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scan } from "./Scan";

@Entity()
export class Testlog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 512 })
  nik: string;

  @Column({ type: "enum", enum: ["positive", "negative"] })
  status: "positive" | "negative";

  @Column({ type: "timestamp" })
  testDate: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
