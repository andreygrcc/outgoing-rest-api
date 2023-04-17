import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find({
      select: ['user_id', 'username', 'email'],
    });
  }
  async findOneOrFail(
    options: FindOneOptions<UsersEntity>,
  ): Promise<UsersEntity> {
    try {
      return await this.usersRepository.findOne(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneByName(username: string): Promise<UsersEntity | null> {
    return await this.usersRepository.findOne({
      where: { username: username },
    });
  }

  async findOneByEmail(email: string): Promise<UsersEntity | null> {
    return await this.usersRepository.findOne({
      where: { email: email },
    });
  }

  async store(data: CreateUserDto): Promise<UsersEntity> {
    const user = await this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<UsersEntity> {
    const user = await this.findOneOrFail({ where: { user_id: id } });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    const user = await this.findOneOrFail({ where: { user_id: id } });
    this.usersRepository.remove(user);
  }
}
