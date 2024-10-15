import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Friends } from './friends.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  password: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @OneToMany(() => Friends, friends => friends.senderUser)
  sentFriendRequests: Friends[];

  @OneToMany(() => Friends, friends => friends.receiverUser)
  receivedFriendRequests: Friends[];
}
