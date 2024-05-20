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

  @Column({ nullable: true, type: 'text' }) // 내용 없이 사진만 넣을 경우 생각해서 nullable true
  detail: string;

  @Column({ nullable: true, type: 'text' }) // 사진 없이 내용만 넣을 경우 생각해서 nullable true
  image: string;

  @Column()
  createdAt: string;
}
