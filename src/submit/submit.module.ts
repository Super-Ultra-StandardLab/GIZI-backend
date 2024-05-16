import { Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submit } from './entities/submit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submit])],
  controllers: [SubmitController],
  providers: [SubmitService],
})
export class SubmitModule {}
