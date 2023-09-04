import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EExpenseCategory } from '../category.enum';

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
}
