import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { ExpendituresService } from 'src/app/expenditures/service/expenditures.service';

@ValidatorConstraint({ name: 'ExpenditureExists', async: true })
@Injectable()
export class ExpenditureExistsDecorator
  implements ValidatorConstraintInterface
{
  constructor(private expenditureService: ExpendituresService) {}

  validate(expenditure: any, args: ValidationArguments) {
    return this.expenditureService
      .findOneOrFail({ where: { expenditureId: expenditure } })
      .then((expenditure) => {
        if (expenditure) return true;
        return false;
      });
  }
}

export function ExpenditureExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExpenditureExists,
    });
  };
}
