import { VerifyRequestDto } from 'src/verify/dto/request/verify-request-dto';
import { CreateVerifyDto } from '../../../verify/dto/request/create-verify.dto';
import { PhoneVerify } from 'src/verify/entities/verify.entity';

export const PhoneNumberData: CreateVerifyDto = {
  phoneNumber: '01012341234',
};

export const verifyData: VerifyRequestDto = {
  phoneNumber: '01012341234',
  verifyCode: '123456',
};

export const verifyResponseData = {
  id: 1,
  phoneNumber: '01012341234',
  verifyCode: '123456',
  isVerified: false,
  expiredAt: new Date(),
} as PhoneVerify;
