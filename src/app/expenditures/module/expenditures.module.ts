import { Module } from '@nestjs/common';
import { ExpendituresEntity } from '../entities/expenditures.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/module/auth.module';
import { ExpendituresMapper } from '../mapper/expenditures.mapper';
import { UsersModule } from '../../users/users.module';
import { ExpendituresController } from '../controller/expenditures.controller';
import { ExpendituresService } from '../service/expenditures.service';
import { EmailModule } from 'src/app/email/module/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpendituresEntity]),
    AuthModule,
    UsersModule,
    EmailModule,
  ],
  providers: [ExpendituresService, ExpendituresMapper],
  controllers: [ExpendituresController],
  exports: [ExpendituresService],
})
export class ExpendituresModule {}
