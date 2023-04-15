import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ name: 'email', type: 'string' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ name: 'password', type: 'string' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
