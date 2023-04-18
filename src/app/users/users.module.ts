import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUserAlreadyExistDecorator } from 'src/shared/decorators/IsUserAlreadyExists.decorator';
import { IsEmailAlreadyExistDecorator } from 'src/shared/decorators/IsEmailAlreadyExists.decorator';
import { UserExistsDecorator } from 'src/shared/decorators/UserExists.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
