import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeType } from './enum/time-type';

@Entity()
export class Submit {
  @PrimaryGeneratedColumn()
  programId: number;

  @Column()
  programName: string;

  @Column({
    type: 'enum',
    enum: ['morning', 'afternoon', 'allday'],
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
  grade: string; // 여러 학년이 동시에 올 경우가 있을 수 있어 string으로 변경하여 1,2학년과 같이 직접 적을 수 있도록 하는 게 나을 듯

  @Column({ nullable: true, type: 'text' })
  question: string;
}
