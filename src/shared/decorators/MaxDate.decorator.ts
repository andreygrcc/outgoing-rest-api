import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export const MAX_DATE = 'maxDate';

export function maxDate(date: unknown, maxDate: Date): boolean {
  const dateObject: Date =
    typeof date === 'string' ? new Date(date) : <Date>date;
  return (
    dateObject instanceof Date && dateObject.getTime() <= maxDate.getTime()
  );
}

export function MaxDate(
  date: Date,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: MAX_DATE,
      constraints: [date],
      validator: {
        validate: (value, args): boolean => maxDate(value, args.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            'a data máxima permitida é ' +
            eachPrefix +
            '$property é $constraint1',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
