import { Repository } from 'typeorm';
import { SubmitService } from './submit.service';
import { Submit } from './entities/submit.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { TimeType } from './entities/enum/time-type';
import { ConflictException } from '@nestjs/common';
import { validateDate } from './function/validateDate';

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
      const createSubmitDto: CreateSubmitDto = {
        programName: 'testProgram',
        time: TimeType.ALLDAY,
        date: '2024-06-02',
        email: 'test@naver.com',
        name: 'tester',
        phone: '01012341234',
        organization: 'testOrganization',
        participant: 100,
        grade: '1',
        question: 'testQuestion',
      };

      const submit = new Submit();

      jest.spyOn(submitRepository, 'find').mockResolvedValue([]);
      jest.spyOn(submitRepository, 'save').mockResolvedValue(submit);

      const result = await submitService.create(createSubmitDto);

      expect(result).toEqual(submit);
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: createSubmitDto.date },
      });
      expect(submitRepository.save).toHaveBeenCalledWith(createSubmitDto);
    });

    it('날짜에 allday가 존재할 때 요청을 넣으면 exception이 발생하는가', async () => {
      const createSubmitDto: CreateSubmitDto = {
        programName: 'testProgram',
        time: TimeType.MORNING,
        date: '2024-06-02',
        email: 'test@naver.com',
        name: 'tester',
        phone: '01012341234',
        organization: 'testOrganization',
        participant: 100,
        grade: '1',
        question: 'testQuestion',
      };

      const existDto: Submit = {
        programId: BigInt(1),
        programName: 'testProgram',
        time: TimeType.ALLDAY,
        date: '2024-06-02',
        email: 'test@naver.com',
        name: 'tester',
        phone: '01012341234',
        organization: 'testOrganization',
        participant: 100,
        grade: '1',
        question: 'testQuestion',
      };

      jest.spyOn(submitRepository, 'find').mockResolvedValue([existDto]);

      await expect(async () => {
        await submitService.create(createSubmitDto);
      }).rejects.toThrow(
        new ConflictException('선택하신 시간에 이미 신청자가 존재합니다.'),
      );
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: createSubmitDto.date },
      });
    });
  });
});
