import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { CreateExpenditureDto } from '../dto/create-expenditure.dto';
import { ExpendituresEntity } from '../entities/expenditures.entity';

@Injectable()
export class ExpendituresMapper {
  constructor(readonly userService: UsersService) {}
  async mapFrom(dto: CreateExpenditureDto) {
    const expenditure = new ExpendituresEntity();
    expenditure.description = dto.description;
    expenditure.expenditureDate = dto.date;
    expenditure.user = await this.userService.findOneOrFail({
      where: { user_id: dto.userId },
    });
    expenditure.value = dto.value;
    return expenditure;
  }
}
