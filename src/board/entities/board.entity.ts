import { PrimaryGeneratedColumn } from 'typeorm';

export class Board {
  @PrimaryGeneratedColumn()
  boardId: bigint;
}
