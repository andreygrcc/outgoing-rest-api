import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

const userEntityList: UsersEntity[] = [
  new UsersEntity({
    email: 'email@email.com',
    password: 'password',
    username: 'username',
    user_id: 'userId',
  }),
];
const userEntity: UsersEntity = new UsersEntity({
  email: 'email@email.com',
  password: 'password',
  username: 'username',
  user_id: 'userId',
});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userEntityList),
            findOne: jest.fn().mockResolvedValue(userEntityList[0]),
            create: jest.fn().mockResolvedValue(userEntityList[0]),
            save: jest.fn().mockResolvedValue(userEntityList[0]),
            findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
            remove: jest.fn(),
            merge: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a user entity list sucessfully', async () => {
      //Act
      const result = await usersService.findAll();
      expect(result).toEqual(userEntityList);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', () => {
      jest.spyOn(usersRepository, 'find').mockRejectedValueOnce(new Error());

      expect(usersService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a user entity item sucessfully', async () => {
      const result = await usersService.findOneOrFail({});
      expect(result).toEqual(userEntityList[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  it('should throw a not found exception', () => {
    jest.spyOn(usersRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(usersService.findOneOrFail({})).rejects.toThrowError(
      NotFoundException,
    );
  });
  describe('findOneByName', () => {
    it('should return a user entity item sucessfully', async () => {
      const result = await usersService.findOneByName('username');
      expect(result).toEqual(userEntityList[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('findOneByName', () => {
    it('should return a user entity item sucessfully', async () => {
      const result = await usersService.findOneByEmail('email');
      expect(result).toEqual(userEntityList[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('store', () => {
    it('should save an return an user entity sucessfully', async () => {
      const result = await usersService.store(userEntity);
      expect(result).toEqual(userEntity);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });
  });
  it('should throw an error', () => {
    jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());
    expect(usersService.store(userEntity)).rejects.toThrowError();
  });
  describe('update', () => {
    it('should update and return an user entity sucessfully', async () => {
      const data: UpdateUserDto = {
        email: 'email@email.com',
        username: 'username',
      };

      const result = await usersService.update('id', data);

      expect(result).toEqual(userEntity);
      expect(usersRepository.save).toBeCalledTimes(1);
      expect(usersRepository.merge).toBeCalledTimes(1);
    });
  });
  it('should throw an error', async () => {
    const data: UpdateUserDto = {
      email: 'email@email.com',
      username: 'username',
    };

    jest
      .spyOn(usersRepository, 'save')
      .mockRejectedValueOnce(new UnauthorizedException());

    expect(usersService.update('id', data)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
  describe('destroy', () => {
    it('should remove an entity and return undefined', async () => {
      const result = await usersService.destroy('userId');
      expect(result).toBeUndefined();
    });
  });
});
