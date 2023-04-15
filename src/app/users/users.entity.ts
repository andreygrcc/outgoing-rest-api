import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { ExpendituresEntity } from '../expenditures/expenditures.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  userId: string;

  @Column({ name: 'username', unique: true })
  @ApiProperty()
  username: string;

  @Column({ name: 'email', unique: true })
  @ApiProperty()
  email: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => ExpendituresEntity, (expenditure) => expenditure.username)
  expenditures: ExpendituresEntity[];

  @BeforeInsert()
  hashPassword(): void {
    this.password = hashSync(this.password, 10);
  }
}
