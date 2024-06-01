import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVerifyDto } from './dto/request/create-verify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/verify.entity';
import { Repository } from 'typeorm';
import { VerifyResponseDto } from './dto/response/verify-response-dto';
import { VerifyRequestDto } from './dto/request/verify-request-dto';
import { generateNumericToken } from './function/randomNumber';
@Injectable()
export class VerifyService {
  static VERIFY_CODE_VALID_TIME = 5; // 인증 만료 시간

  constructor(
    @InjectRepository(PhoneVerify)
    private readonly PhoneVerifyRepository: Repository<PhoneVerify>,
  ) {}

  async createVerify(
    createVerifyDto: CreateVerifyDto,
  ): Promise<VerifyResponseDto> {
    const verifyCode = generateNumericToken(); // 랜덤 6자리 번호

    const expiredAt = new Date();
    expiredAt.setMinutes(
      expiredAt.getMinutes() + VerifyService.VERIFY_CODE_VALID_TIME,
    );

    await this.PhoneVerifyRepository.save({
      verifyCode,
      phoneNumber: createVerifyDto.phoneNumber,
      expiredAt,
    });
    const verifyResponse = VerifyResponseDto.of(true);

    return verifyResponse;
  }

  async verify(verifyRequestDto: VerifyRequestDto): Promise<VerifyResponseDto> {
    const { phoneNumber, verifyCode } = verifyRequestDto;

    const phoneVerification =
      await this.PhoneVerifyRepository.createQueryBuilder('pv')
        .where('pv.phoneNumber = :phoneNumber', { phoneNumber })
        .andWhere('pv.verifyCode = :verifyCode', { verifyCode })
        .andWhere('pv.isVerified = false')
        .andWhere('pv.expiredAt > NOW()')
        .orderBy({ createdAt: 'DESC' })
        .getOne();

    if (!phoneVerification) {
      return VerifyResponseDto.of(false);
    } // 있는지 확인
    this.PhoneVerifyRepository.update(phoneVerification.id, {
      isVerified: true, // 인증 완료시키기
    });
    const verifyResponse = VerifyResponseDto.of(true);

    return verifyResponse;
  }
}
