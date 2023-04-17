import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { IsUserAlreadyExistDecorator } from './shared/decorators/IsUserAlreadyExists.decorator';
import { ExpendituresModule } from './app/expenditures/module/expenditures.module';
import { IsEmailAlreadyExistDecorator } from './shared/decorators/IsEmailAlreadyExists.decorator';
import { UserExistsDecorator } from './shared/decorators/UserExists.decorator';
import { EmailModule } from './app/email/module/email.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    ExpendituresModule,
    EmailModule,
  ],
  providers: [
    IsUserAlreadyExistDecorator,
    IsEmailAlreadyExistDecorator,
    UserExistsDecorator,
  ],
})
export class AppModule {}
