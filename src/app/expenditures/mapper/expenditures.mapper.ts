import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { CreateExpenditureDto } from '../dto/create-expenditure.dto';
import { ExpendituresEntity } from '../entities/expenditures.entity';

@Injectable()
export class ExpendituresMapper {
  constructor(readonly usersService: UsersService) {}
  async mapFrom(dto: CreateExpenditureDto) {
    const expenditure = new ExpendituresEntity();
    expenditure.description = dto.description;
    expenditure.expenditureDate = dto.date;
    expenditure.user = await this.usersService.findOneOrFail({
      where: { user_id: dto.userId },
    });
    expenditure.value = dto.value;
    return expenditure;
  }
}
