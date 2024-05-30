import {
  BaseEntity as TypeORMBaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from './date.entity';

@Entity()
export class PhoneVerify extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  verifyCode: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  expiredAt: Date;
}
