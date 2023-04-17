import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/users.entity';

@Entity({ name: 'expenditures' })
export class ExpendituresEntity {
  @PrimaryGeneratedColumn('uuid')
  expenditureId: string;
  @Column({
    name: 'value',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
  })
  value: number;
  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'expenditureDate', type: 'date' })
  expenditureDate: Date;

  @ManyToOne(() => UsersEntity, (user) => user.expenditure, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user?: UsersEntity;
}
