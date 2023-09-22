import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "../expenses/entities/expense.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @OneToMany(() => Expense, (_expense) => _expense.user, { eager: true })
  expenses: Expense[];
}
