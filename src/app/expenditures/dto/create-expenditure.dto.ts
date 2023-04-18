import {
  IsDateString,
  IsNotEmpty,
  IsPositive,
  MaxLength,
} from 'class-validator';
import { MaxDate } from 'src/shared/decorators/MaxDate.decorator';
import { UserExists } from 'src/shared/decorators/UserExists.decorator';

export class CreateExpenditureDto {
  @UserExists({
    message: 'Esse usuário não existe em nossos dados',
  })
  userId?: string;

  @IsNotEmpty()
  @MaxLength(191, {
    message:
      'A descrição é muito longa. o tamanho máximo é $constraint1 caracteres, atualmente possui $value',
  })
  description: string;

  @IsPositive()
  @IsNotEmpty()
  value: number;

  @MaxDate(new Date())
  @IsDateString()
  date: Date;
}
