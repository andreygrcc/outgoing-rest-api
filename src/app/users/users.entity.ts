import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { ExpendituresEntity } from '../expenditures/entities/expenditures.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  user_id?: string;

  @Column({ name: 'username', unique: true })
  @ApiProperty()
  username: string;

  @Column({ name: 'email', unique: true })
  @ApiProperty()
  email: string;

  @Column({ name: 'password', select: false })
  password: string;

  @OneToMany(() => ExpendituresEntity, (expenditure) => expenditure.user)
  expenditure?: ExpendituresEntity[];

  @BeforeInsert()
  hashPassword(): void {
    this.password = hashSync(this.password, 10);
  }
}
