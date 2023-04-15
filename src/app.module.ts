import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { IsUserAlreadyExistConstraint } from './utils/UserExistsConstraint';
import { ExpendituresModule } from './app/expenditures/expenditures.module';
import { IsEmailAlreadyExistConstraint } from './utils/EmailExistsConstraint';
import { AppController } from './app.controller';

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
  ],
  controllers: [AppController],
  providers: [IsUserAlreadyExistConstraint, IsEmailAlreadyExistConstraint],
})
export class AppModule {}
