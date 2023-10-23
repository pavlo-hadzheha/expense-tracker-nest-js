import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EExpenseCategory } from '../category.enum';
import { User } from '../../auth/user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date: string;

  @Column('float4')
  amount: number;

  @Column()
  category: EExpenseCategory;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.expenses)
  user?: User;
}
