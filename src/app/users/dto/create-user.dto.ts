import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailAlreadyExist } from 'src/utils/EmailExistsConstraint';
import { IsUserAlreadyExist } from 'src/utils/UserExistsConstraint';
export class CreateUserDto {
  @IsNotEmpty()
  @IsUserAlreadyExist({
    message: 'O usuário $value já está cadastrado.',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsEmailAlreadyExist({
    message: 'O email $value já está cadastrado.',
  })
  @ApiProperty()
  email: string;
}
