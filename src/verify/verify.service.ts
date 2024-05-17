import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVerifyDto } from './dto/request/create-verify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/verify.entity';
import { Repository } from 'typeorm';
import { VerifyResponseDto } from './dto/response/verify-response-dto';
import { VerifyRequestDto } from './dto/request/verify-request-dto';

export function generateNumericToken(
  length: number = 6,
  alphabet: string = '1234567890',
): string {
  let id = '';
  let i = length;
  while (i--) {
    id += alphabet[(Math.random() * alphabet.length) | 0];
  }
  return id;
}

@Injectable()
export class VerifyService {
  constructor(
    @InjectRepository(PhoneVerify)
    private readonly PhoneVerifyRepository: Repository<PhoneVerify>,
  ) {}
  async create(createVerifyDto: CreateVerifyDto): Promise<VerifyResponseDto> {
    const VERIFY_CODE_VALID_TIME = 5;
    const verifyCode = generateNumericToken();

    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + VERIFY_CODE_VALID_TIME);

    await this.PhoneVerifyRepository.save({
      verifyCode,
      phoneNumber: createVerifyDto.phoneNumber,
      expiredAt,
    });

    const verifyResponse = new VerifyResponseDto();
    verifyResponse.result = true;

    return verifyResponse;
  }

  async verify(verifyRequestDto: VerifyRequestDto) {
    const { phoneNumber, verifyCode } = verifyRequestDto;

    const phoneVerification =
      await this.PhoneVerifyRepository.createQueryBuilder('pv')
        .where('pv.phoneNumber = :phoneNumber', { phoneNumber })
        .andWhere('pv.verifyCode = :verifyCode', { verifyCode })
        .andWhere('pv.isVerified = false')
        .andWhere('pv.expiredAt > NOW()')
        .orderBy({ createdAt: 'DESC' })
        .getOne();

    if (!phoneVerification) throw new UnauthorizedException();
    this.PhoneVerifyRepository.update(phoneVerification.id, {
      isVerified: true,
    });

    const verifyResponse = new VerifyResponseDto();
    verifyResponse.result = true;

    return verifyResponse;
  }

  findAll() {
    return this.PhoneVerifyRepository.find();
  }
}
