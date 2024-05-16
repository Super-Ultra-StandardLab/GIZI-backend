import { Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';

@Module({
  controllers: [SubmitController],
  providers: [SubmitService],
})
export class SubmitModule {}
