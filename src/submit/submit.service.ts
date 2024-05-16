import { Injectable } from '@nestjs/common';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { UpdateSubmitDto } from './dto/update-submit.dto';
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
    return this.SubmitRepository.save(createSubmitDto);
  }

  findAll() {
    return `This action returns all submit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submit`;
  }

  update(id: number, updateSubmitDto: UpdateSubmitDto) {
    return `This action updates a #${id} submit`;
  }

  remove(id: number) {
    return `This action removes a #${id} submit`;
  }
}
