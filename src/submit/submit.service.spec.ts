import { Repository } from 'typeorm';
import { SubmitService } from './submit.service';
import { Submit } from './entities/submit.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { DateConflictException } from '../global/exception/custom-exception';
import {
  alldayTypeResponseData,
  alldayTypeSubmitData,
  morningTypeResponseData,
  morningTypeSubmitData,
} from '../global/tests/data/submit-data';
import { CreateSubmitDto } from './dto/request/create-submit.dto';

describe('SubmitService', () => {
  let submitService: SubmitService;
  let submitRepository: Repository<Submit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmitService,
        {
          provide: getRepositoryToken(Submit),
          useClass: Repository,
        },
      ],
    }).compile();

    submitService = module.get<SubmitService>(SubmitService);
    submitRepository = module.get<Repository<Submit>>(
      getRepositoryToken(Submit),
    );
  });

  it('submitService가 정의되었는지', () => {
    expect(submitService).toBeDefined();
  });

  describe('create', () => {
    it('정상적인 신청이 잘 되는지', async () => {
      const CreateSubmitDto: CreateSubmitDto = alldayTypeSubmitData;
      const submit = new Submit();

      jest.spyOn(submitRepository, 'find').mockResolvedValue([]);
      jest.spyOn(submitRepository, 'save').mockResolvedValue(submit);

      const result = await submitService.create(CreateSubmitDto);

      expect(result).toEqual(submit);
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: CreateSubmitDto.date },
      });
      expect(submitRepository.save).toHaveBeenCalledWith(CreateSubmitDto);
    });

    it('날짜에 allday가 존재할 때 요청하면 exception이 발생하는가', async () => {
      const CreateSubmitDto: CreateSubmitDto = morningTypeSubmitData;
      const Submit: Submit = alldayTypeResponseData;

      jest.spyOn(submitRepository, 'find').mockResolvedValue([Submit]);

      await expect(async () => {
        await submitService.create(CreateSubmitDto);
      }).rejects.toThrow(
        new ConflictException('선택하신 시간에 이미 신청자가 존재합니다.'),
      );
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: CreateSubmitDto.date },
      });
    });

    it('같은 날짜 & 시간이 존재할 때 요청하면 exception이 발생하는가', async () => {
      const CreateSubmitDto: CreateSubmitDto = morningTypeSubmitData;
      const Submit: Submit = morningTypeResponseData;

      jest.spyOn(submitRepository, 'find').mockResolvedValue([Submit]);

      await expect(async () => {
        await submitService.create(CreateSubmitDto);
      }).rejects.toThrow(new DateConflictException());
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: CreateSubmitDto.date },
      });
    });
  });
});
