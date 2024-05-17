import { Injectable } from '@nestjs/common';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { Submit } from './entities/submit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubmitService {
  constructor(
    @InjectRepository(Submit)
    private readonly SubmitRepository: Repository<Submit>,
  ) {}

  create(createSubmitDto: CreateSubmitDto) {
    // 만약 신청 꽉 차서 못 하는 날짜일 경우에는 필터링해야 할 듯..?
    return this.SubmitRepository.save(createSubmitDto);
  }

  findAll(): Promise<Submit[]> {
    return this.SubmitRepository.find();
  }

  findOne(programId: bigint): Promise<Submit> {
    return this.SubmitRepository.findOne({ where: { programId } });
  }

  remove(programId: bigint) {
    return this.SubmitRepository.delete({ programId });
  }
}
