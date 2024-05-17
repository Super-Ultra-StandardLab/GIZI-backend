import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeType } from './enum/time-type';

@Entity()
export class Submit {
  @PrimaryGeneratedColumn()
  programId: bigint;

  @Column()
  programName: string;

  @Column({
    type: 'enum',
    enum: ['morning', 'afternoon', 'allday'],
    default: 'allday',
  })
  time: TimeType;

  @Column({ type: 'varchar', length: 20 })
  date: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  organization: string;

  @Column()
  participant: number;

  @Column()
  grade: number; // 여러 학년이 동시에 올 경우는 어떻게 해야 할지

  @Column({ nullable: true, type: 'text' })
  question: string;
}
