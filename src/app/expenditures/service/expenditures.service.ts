import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { DateDto } from '../dto/date.dto';
import { UpdateExpenditureDto } from '../dto/update-expenditure.dto';
import { ExpendituresEntity } from '../entities/expenditures.entity';
@Injectable()
export class ExpendituresService {
  constructor(
    @InjectRepository(ExpendituresEntity)
    private readonly expenditureRepository: Repository<ExpendituresEntity>,
  ) {}

  async findAll(userId: string): Promise<ExpendituresEntity[]> {
    return await this.expenditureRepository.find({
      where: { user: { user_id: userId } },
    });
  }

  async findOneOrFail(
    options: FindOneOptions<ExpendituresEntity>,
  ): Promise<ExpendituresEntity> {
    try {
      return await this.expenditureRepository.findOne(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByDate(data: DateDto): Promise<ExpendituresEntity[] | null> {
    try {
      return await this.expenditureRepository.find({
        where: { user: { user_id: data.userId }, expenditureDate: data.date },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: ExpendituresEntity) {
    return await this.expenditureRepository.save(data);
  }

  async update(data: UpdateExpenditureDto): Promise<ExpendituresEntity> {
    try {
      const expenditure = await this.findOneOrFail({
        where: {
          user: { user_id: data.userId },
          expenditureId: data.expenditureId,
        },
      });
      this.expenditureRepository.merge(expenditure, data);
      return await this.expenditureRepository.save(expenditure);
    } catch (error) {
      throw new UnauthorizedException(
        'O ID está errado ou você não possui autorização para atualizar esta despesa',
      );
    }
  }

  async destroy(userId: string, expenditureId: string) {
    try {
      const expenditure = await this.findOneOrFail({
        where: { user: { user_id: userId }, expenditureId: expenditureId },
      });
      this.expenditureRepository.remove(expenditure);
    } catch (error) {
      throw new UnauthorizedException(
        'O ID está errado ou você não possui autorização para deletar esta despesa',
      );
    }
  }
}
