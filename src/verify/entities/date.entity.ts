import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
