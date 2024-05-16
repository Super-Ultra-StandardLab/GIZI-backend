import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TimeType = 'morning' | 'afternoon' | 'allday';

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
  role: TimeType;

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
  grade: number;

  @Column({ nullable: true, type: 'text' })
  question: string;
}
