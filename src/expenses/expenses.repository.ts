import { GenericRepository } from '../generic.repository';
import { Expense } from './entities/expense.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesRepository extends GenericRepository<Expense> {
  constructor(
    @InjectRepository(Expense) expenseRepository: Repository<Expense>,
  ) {
    super(expenseRepository);
  }
}
