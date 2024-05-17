import { Module } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { VerifyController } from './verify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneVerify])],
  controllers: [VerifyController],
  providers: [VerifyService],
})
export class VerifyModule {}
