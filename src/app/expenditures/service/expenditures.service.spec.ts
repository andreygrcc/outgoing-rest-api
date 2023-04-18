import { Test, TestingModule } from '@nestjs/testing';
import { ExpendituresService } from './expenditures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExpendituresEntity } from '../entities/expenditures.entity';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DateDto } from '../dto/date.dto';
import { UpdateExpenditureDto } from '../dto/update-expenditure.dto';

const expenditureEntityList: ExpendituresEntity[] = [
  new ExpendituresEntity({
    description: 'description',
    expenditureDate: new Date(),
    expenditureId: 'uuid Expenditure',
    user: {
      email: 'email@email.com',
      password: 'password',
      username: 'username',
      user_id: 'userId',
      hashPassword() {
        return null;
      },
    },
    value: 20.0,
  }),
];
const expenditureEntity: ExpendituresEntity = new ExpendituresEntity();

describe('ExpenditureService', () => {
  let expenditureService: ExpendituresService;
  let expenditureRepository: Repository<ExpendituresEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpendituresService,
        {
          provide: getRepositoryToken(ExpendituresEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(expenditureEntityList),
            findOne: jest.fn().mockResolvedValue(expenditureEntityList[0]),
            save: jest.fn().mockResolvedValue(expenditureEntity),
            merge: jest.fn().mockResolvedValue(expenditureEntity),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    expenditureService = module.get<ExpendituresService>(ExpendituresService);
    expenditureRepository = module.get<Repository<ExpendituresEntity>>(
      getRepositoryToken(ExpendituresEntity),
    );
  });

  it('should be defined', () => {
    expect(expenditureService).toBeDefined();
    expect(expenditureRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a expenditure entity list sucessfully', async () => {
      //Act
      const result = await expenditureService.findAll('uuidUsuario');
      expect(result).toEqual(expenditureEntityList);
      expect(expenditureRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', () => {
      jest
        .spyOn(expenditureRepository, 'find')
        .mockRejectedValueOnce(new Error());

      expect(expenditureService.findAll('uuidUsuario')).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a expenditure entity item sucessfully', async () => {
      const result = await expenditureService.findOneOrFail({});
      expect(result).toEqual(expenditureEntityList[0]);
      expect(expenditureRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  it('should throw a not found exception', () => {
    jest
      .spyOn(expenditureRepository, 'findOne')
      .mockRejectedValueOnce(new Error());

    expect(expenditureService.findOneOrFail({})).rejects.toThrowError(
      NotFoundException,
    );
  });
  describe('findByDate', () => {
    it('should return a expenditure entity item sucessfully', async () => {
      const data: DateDto = {
        date: new Date(),
        userId: 'uuid',
      };

      const result = await expenditureService.findByDate(data);
      expect(result).toEqual(expenditureEntityList);
    });
  });
  it('should throw a not found exception', () => {
    const data: DateDto = {
      date: new Date(),
      userId: 'uuid',
    };
    jest
      .spyOn(expenditureRepository, 'find')
      .mockRejectedValueOnce(new Error());

    expect(expenditureService.findByDate(data)).rejects.toThrowError(
      NotFoundException,
    );
  });
  describe('store', () => {
    it('should save an return an expenditure entity sucessfully', async () => {
      const result = await expenditureService.store(expenditureEntity);

      expect(result).toEqual(expenditureEntity);
    });
  });
  it('should throw an error', () => {
    jest
      .spyOn(expenditureRepository, 'save')
      .mockRejectedValueOnce(new Error());

    expect(expenditureService.store(expenditureEntity)).rejects.toThrowError();
  });
  describe('update', () => {
    it('should update and return an expenditure entity sucessfully', async () => {
      const data: UpdateExpenditureDto = {
        description: 'description',
        expenditureId: 'uuid Expenditure',
        value: 10.0,
        userId: 'uuid User',
      };

      const result = await expenditureService.update(data);

      expect(result).toEqual(expenditureEntity);
      expect(expenditureRepository.merge).toBeCalledTimes(1);
      expect(expenditureRepository.save).toBeCalledTimes(1);
    });
  });
  it('should throw an error', async () => {
    const data: UpdateExpenditureDto = {
      description: 'description',
      expenditureId: 'uuid Expenditure',
      value: 10.0,
      userId: 'uuid User',
    };

    jest
      .spyOn(expenditureRepository, 'save')
      .mockRejectedValueOnce(new UnauthorizedException());

    expect(expenditureService.update(data)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
  describe('destroy', () => {
    it('should remove an entity and return undefined', async () => {
      const result = await expenditureService.destroy(
        'userId',
        'expenditureId',
      );
      expect(result).toBeUndefined();
    });
  });
});
