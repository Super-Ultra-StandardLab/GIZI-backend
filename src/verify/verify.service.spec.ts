import { Test, TestingModule } from '@nestjs/testing';
import { VerifyService } from './verify.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/verify.entity';
import { CreateVerifyDto } from './dto/request/create-verify.dto';
import { VerifyRequestDto } from './dto/request/verify-request-dto';
import { VerifyResponseDto } from './dto/response/verify-response-dto';
import {
  PhoneNumberData,
  verifyData,
  verifyResponseData,
} from '../global/tests/data/verify-data';

describe('VerifyService', () => {
  let verifyservice: VerifyService;
  let phoneVerifyRepository: Repository<PhoneVerify>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyService,
        {
          provide: getRepositoryToken(PhoneVerify),
          useClass: Repository,
        },
      ],
    }).compile();

    verifyservice = module.get<VerifyService>(VerifyService);
    phoneVerifyRepository = module.get<Repository<PhoneVerify>>(
      getRepositoryToken(PhoneVerify),
    );
  });

  it('verifyservice가 정의되었는지', () => {
    expect(verifyservice).toBeDefined();
  });

  describe('createVerify', () => {
    it('전화번호를 입력하면 result를 반환하는지', async () => {
      const CreateVerifyDto: CreateVerifyDto = PhoneNumberData;
      const saveSpy = jest
        .spyOn(phoneVerifyRepository, 'save')
        .mockResolvedValue(null);

      const result = await verifyservice.createVerify(CreateVerifyDto);

      expect(saveSpy).toHaveBeenCalled();
      expect(result).toEqual(VerifyResponseDto.of(true));
    });
  });

  describe('verify', () => {
    it('인증번호를 비교하고 맞다면 true를 반환하는지', async () => {
      const verifyRequestDto: VerifyRequestDto = verifyData;
      const phoneVerification: PhoneVerify = verifyResponseData;

      const createQueryBuilderMock = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(phoneVerification),
      };

      jest
        .spyOn(phoneVerifyRepository, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilderMock as any);
      const updateSpy = jest
        .spyOn(phoneVerifyRepository, 'update')
        .mockResolvedValue(null);

      const result = await verifyservice.verify(verifyRequestDto);

      expect(createQueryBuilderMock.where).toHaveBeenCalled();
      expect(createQueryBuilderMock.andWhere).toHaveBeenCalled();
      expect(createQueryBuilderMock.getOne).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith(phoneVerification.id, {
        isVerified: true,
      });
      expect(result).toEqual(VerifyResponseDto.of(true));
    });

    it('인증번호를 비교하고 틀리다면 false를 반환하는지', async () => {
      const verifyRequestDto: VerifyRequestDto = verifyData;

      const createQueryBuilderMock = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };

      jest
        .spyOn(phoneVerifyRepository, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilderMock as any);

      const result = await verifyservice.verify(verifyRequestDto);

      expect(createQueryBuilderMock.where).toHaveBeenCalled();
      expect(createQueryBuilderMock.andWhere).toHaveBeenCalled();
      expect(createQueryBuilderMock.getOne).toHaveBeenCalled();
      expect(result).toEqual(VerifyResponseDto.of(false));
    });
  });
});
