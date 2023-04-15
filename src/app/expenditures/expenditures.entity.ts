import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

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
  @Column({ name: 'description', type: 'char' })
  description: string;
  @ManyToOne(() => UsersEntity, (user) => user.username)
  username: UsersEntity;
  @Column({ name: 'expenditureDate', type: 'date' })
  expenditureDate: Date;
}
