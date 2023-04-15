import { Module } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { ExpendituresController } from './expenditures.controller';

@Module({
  providers: [ExpendituresService],
  controllers: [ExpendituresController],
  exports: [ExpendituresService],
})
export class ExpendituresModule {}
