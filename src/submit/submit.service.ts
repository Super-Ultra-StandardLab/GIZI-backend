import { Injectable } from '@nestjs/common';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { Submit } from './entities/submit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ResponseSubmitDto } from './dto/response/submit-response-dto';
import { ResponseAllSubmitDto } from './dto/response/all-submit-response-dto';
import { validateDate } from './function/validateDate';

@Injectable()
export class SubmitService {
  constructor(
    @InjectRepository(Submit)
    private readonly SubmitRepository: Repository<Submit>,
  ) {}

  async create(createSubmitDto: CreateSubmitDto): Promise<Submit> {
    // 만약 신청 꽉 차서 못 하는 날짜일 경우에는 필터링
    const checkDate = await this.SubmitRepository.find({
      where: { date: createSubmitDto.date },
    });
    validateDate(checkDate, createSubmitDto);

    return await this.SubmitRepository.save(createSubmitDto);
  }

  async findAll(): Promise<Submit[]> {
    return ResponseAllSubmitDto.listOf(
      await this.SubmitRepository.find({
        order: {
          date: 'DESC',
        },
      }),
    );
  }

  async findOne(programId: bigint): Promise<ResponseSubmitDto> {
    return ResponseSubmitDto.of(
      await this.SubmitRepository.findOne({ where: { programId } }),
    );
  }

  remove(programId: bigint): Promise<DeleteResult> {
    return this.SubmitRepository.delete({ programId });
  }
}
