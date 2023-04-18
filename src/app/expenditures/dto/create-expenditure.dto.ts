import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  description: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  value: number;

  @MaxDate(new Date())
  @IsDateString()
  @ApiProperty()
  date: Date;
}
