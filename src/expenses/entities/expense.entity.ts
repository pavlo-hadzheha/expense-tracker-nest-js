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

  @Column()
  amount: number;

  @Column()
  category: EExpenseCategory;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.expenses)
  user?: User;
}
