import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { Submit } from './entities/submit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseSubmitDto } from './dto/response/submit-response-dto';
import { ResponseAllSubmitDto } from './dto/response/all-submit-response-dto';

@Injectable()
export class SubmitService {
  constructor(
    @InjectRepository(Submit)
    private readonly SubmitRepository: Repository<Submit>,
  ) {}

  async create(createSubmitDto: CreateSubmitDto) {
    // 만약 신청 꽉 차서 못 하는 날짜일 경우에는 필터링
    const checkDate = await this.SubmitRepository.find({
      where: { date: createSubmitDto.date },
    });

    if (createSubmitDto.time === 'allday' && checkDate.length !== 0) {
      throw new ConflictException('선택하신 시간에 이미 신청자가 존재합니다.'); // FIXME: 나중에 한번에 customException으로 처리하기
    }
    checkDate.forEach((item) => {
      if (item.time === createSubmitDto.time || item.time === 'allday') {
        throw new ConflictException(
          `선택하신 시간에 이미 신청자가 존재합니다.`, // FIXME: 나중에 한번에 customException으로 처리하기
        );
      }
    });

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

  remove(programId: bigint) {
    return this.SubmitRepository.delete({ programId });
  }
}
