import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeType } from './enum/time-type';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Submit {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  programId: number;

  @Column()
  @ApiProperty()
  programName: string;

  @Column({
    type: 'enum',
    enum: ['morning', 'afternoon', 'allday'],
  })
  @ApiProperty()
  time: TimeType;

  @Column({ type: 'varchar', length: 20 })
  @ApiProperty()
  date: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @ApiProperty()
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @ApiProperty()
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  @ApiProperty()
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  organization: string;

  @Column()
  @ApiProperty()
  participant: number;

  @Column()
  @ApiProperty()
  grade: string; // 여러 학년이 동시에 올 경우가 있을 수 있어 string으로 변경하여 1,2학년과 같이 직접 적을 수 있도록 하는 게 나을 듯

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  question: string;
}
