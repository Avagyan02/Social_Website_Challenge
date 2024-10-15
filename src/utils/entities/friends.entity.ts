import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class Friends {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  senderUser: Users;

  @ManyToOne(() => Users, (user) => user.id)
  receiverUser: Users;

  @CreateDateColumn()
  requestDate: Date;

  @UpdateDateColumn({ nullable: true })
  acceptanceDate?: Date;

  @Column({ nullable: true })
  accepted?: boolean;
}
