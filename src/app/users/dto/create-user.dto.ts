import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailAlreadyExist } from 'src/shared/decorators/IsEmailAlreadyExists.decorator';
import { IsUserAlreadyExist } from 'src/shared/decorators/IsUserAlreadyExists.decorator';
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
