import { TimeType } from '../entities/enum/time-type';
import { CreateSubmitDto } from '../dto/request/create-submit.dto';
import { Submit } from '../entities/submit.entity';
import { DateConflictException } from '../../global/exception/custom-exception';

export function validateDate(checkDate, createSubmitDto: CreateSubmitDto) {
  if (createSubmitDto.time === TimeType.ALLDAY && checkDate.length !== 0) {
    throw new DateConflictException();
  }
  checkDate.forEach((item: Submit) => {
    if (item.time === createSubmitDto.time || item.time === 'allday') {
      throw new DateConflictException();
    }
  });
}
