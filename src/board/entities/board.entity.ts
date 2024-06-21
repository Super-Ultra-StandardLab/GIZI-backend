import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardType } from './enum/boardType-type';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  boardId: number;

  @Column({
    type: 'enum',
    enum: BoardType,
  })
  @ApiProperty()
  type: BoardType;

  @Column({ nullable: true })
  @ApiProperty()
  thumbnail: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: false, type: 'text' })
  @ApiProperty()
  detail: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: string;
}
