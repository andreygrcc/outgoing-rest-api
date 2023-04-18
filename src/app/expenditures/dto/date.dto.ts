import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { MaxDate } from 'src/shared/decorators/MaxDate.decorator';
import { UserExists } from 'src/shared/decorators/UserExists.decorator';

export class DateDto {
  @UserExists({
    message: 'Esse usuário não existe em nossos dados',
  })
  userId?: string;

  @MaxDate(new Date())
  @IsDateString()
  @ApiProperty()
  date: Date;
}
