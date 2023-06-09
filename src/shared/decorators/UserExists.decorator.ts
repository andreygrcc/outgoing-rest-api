import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsersService } from 'src/app/users/users.service';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsDecorator implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  validate(userName: any, args: ValidationArguments) {
    return this.usersService.findOneByName(userName).then((user) => {
      if (user) return true;
      return false;
    });
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserExistsDecorator,
    });
  };
}
