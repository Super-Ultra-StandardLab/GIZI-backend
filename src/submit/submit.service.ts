import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { Submit } from './entities/submit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Repository } from 'typeorm';
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
    const result = ResponseAllSubmitDto.listOf(
      // TODO: 디자인 보고 전체 신청에서는 뭐만 select해서 띄울지 설정하기
      await this.SubmitRepository.find({
        order: {
          date: 'DESC',
        },
      }),
    );
    if (result.length == 0) throw new NotFoundException();
    return result;
  }

  async findCalendar(month: number, year: number): Promise<Submit[]> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;

    const result = ResponseAllSubmitDto.listOf(
      await this.SubmitRepository.find({
        where: {
          date: Between(startDate, endDate),
        },
      }),
    );

    return result;
  }

  async findOne(programId: number): Promise<ResponseSubmitDto> {
    const result = ResponseSubmitDto.of(
      await this.SubmitRepository.findOne({ where: { programId } }),
    );
    if (!result) throw new NotFoundException();
    return result;
  }

  remove(programId: number): Promise<DeleteResult> {
    return this.SubmitRepository.delete({ programId });
  }
}
