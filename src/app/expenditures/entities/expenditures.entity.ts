import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'expenditures' })
export class ExpendituresEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  expenditureId: string;
  @Column({
    name: 'value',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
  })
  @ApiProperty()
  value: number;
  @Column({ name: 'description', type: 'varchar' })
  @ApiProperty()
  description: string;

  @Column({ name: 'expenditureDate', type: 'date' })
  @ApiProperty()
  expenditureDate: Date;

  @ManyToOne(() => UsersEntity, (user) => user.expenditure, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user?: UsersEntity;

  constructor(expenditure?: Partial<ExpendituresEntity>) {
    this.expenditureId = expenditure?.expenditureId;
    this.description = expenditure?.description;
    this.expenditureDate = expenditure?.expenditureDate;
    this.value = expenditure?.value;
    this.user = expenditure?.user;
  }
}
