import { TimeType } from '../entities/enum/time-type';
import { CreateSubmitDto } from '../dto/request/create-submit.dto';
import { Submit } from '../entities/submit.entity';
import { DateConflictException } from '../../global/exception/custom-exception';

function validateAllDayConflict(
  checkDate: Submit[],
  createSubmitDto: CreateSubmitDto,
) {
  if (createSubmitDto.time === TimeType.ALLDAY && checkDate.length !== 0) {
    throw new DateConflictException();
  }
}

function validateTimeConflict(
  checkDate: Submit[],
  createSubmitDto: CreateSubmitDto,
) {
  checkDate.forEach((item: Submit) => {
    if (item.time === createSubmitDto.time || item.time === TimeType.ALLDAY) {
      throw new DateConflictException();
    }
  });
}

export function validateDate(
  checkDate: Submit[],
  createSubmitDto: CreateSubmitDto,
) {
  validateAllDayConflict(checkDate, createSubmitDto);
  validateTimeConflict(checkDate, createSubmitDto);
}
