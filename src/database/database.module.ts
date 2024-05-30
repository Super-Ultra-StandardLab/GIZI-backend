const dotenv = require('dotenv');
dotenv.config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';
import { Submit } from 'src/submit/entities/submit.entity';
import { PhoneVerify } from 'src/verify/entities/verify.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      entities: [Submit, PhoneVerify, Board],
    }),
  ],
})
export class DatabaseModule {}
