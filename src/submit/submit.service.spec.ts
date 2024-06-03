import { Repository } from 'typeorm';
import { SubmitService } from './submit.service';
import { Submit } from './entities/submit.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DateConflictException } from '../global/exception/custom-exception';
import {
  alldayTypeResponseData,
  alldayTypeSubmitData,
  findAllResponseData,
  findOneRequestId,
  findOneResponseData,
  morningTypeResponseData,
  morningTypeSubmitData,
} from '../global/tests/data/submit-data';
import { NotFoundException } from '@nestjs/common';

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
      const submit = new Submit();

      jest.spyOn(submitRepository, 'find').mockResolvedValue([]);
      jest.spyOn(submitRepository, 'save').mockResolvedValue(submit);

      const result = await submitService.create(alldayTypeSubmitData);

      expect(result).toEqual(submit);
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: alldayTypeSubmitData.date },
      });
      expect(submitRepository.save).toHaveBeenCalledWith(alldayTypeSubmitData);
    });

    it('날짜에 allday가 존재할 때 요청하면 exception이 발생하는가', async () => {
      jest
        .spyOn(submitRepository, 'find')
        .mockResolvedValue([alldayTypeResponseData]);

      await expect(async () => {
        await submitService.create(morningTypeSubmitData);
      }).rejects.toThrow(new DateConflictException());
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: morningTypeSubmitData.date },
      });
    });

    it('같은 날짜 & 시간이 존재할 때 요청하면 exception이 발생하는가', async () => {
      jest
        .spyOn(submitRepository, 'find')
        .mockResolvedValue([morningTypeResponseData]);

      await expect(async () => {
        await submitService.create(morningTypeSubmitData);
      }).rejects.toThrow(new DateConflictException());
      expect(submitRepository.find).toHaveBeenCalledWith({
        where: { date: morningTypeSubmitData.date },
      });
    });
  });
  describe('findAll', () => {
    it('잘 작동하는지', async () => {
      jest
        .spyOn(submitRepository, 'find')
        .mockResolvedValue(findAllResponseData);
      const result = await submitService.findAll();

      expect(result).toEqual(findAllResponseData);
      expect(submitRepository.find).toHaveBeenCalledWith({
        order: { date: 'DESC' },
      });
    });

    it('find할 게 없다면 NotFoundException이 발생하는지', async () => {
      jest.spyOn(submitRepository, 'find').mockResolvedValue([]);

      await expect(async () => {
        await submitService.findAll();
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('잘 작동하는지', async () => {
      jest
        .spyOn(submitRepository, 'findOne')
        .mockResolvedValue(findOneResponseData);

      const result = await submitService.findOne(findOneRequestId);

      expect(result).toEqual(findOneResponseData);
      expect(submitRepository.findOne).toHaveBeenCalledWith({
        where: { programId: findOneRequestId },
      });
    });

    it('findOne할 게 없다면 NotFoundException이 발생하는지', async () => {
      jest.spyOn(submitRepository, 'findOne').mockResolvedValue(null);

      await expect(async () => {
        await submitService.findOne(findOneRequestId);
      }).rejects.toThrow(NotFoundException);
      expect(submitRepository.findOne).toHaveBeenCalledWith({
        where: { programId: findOneRequestId },
      });
    });
  });
});
