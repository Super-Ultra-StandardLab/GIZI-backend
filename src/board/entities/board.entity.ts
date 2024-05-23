import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardType } from './enum/boardType-type';
@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  boardId: bigint;

  @Column({
    type: 'enum',
    enum: ['notice', 'news', 'activity'],
  })
  type: BoardType;

  @Column({ nullable: true })
  thumbnail: string;

  @Column()
  title: string;

  @Column({ nullable: false, type: 'text' })
  detail: string;

  @Column()
  createdAt: string;
}
