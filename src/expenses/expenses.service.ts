import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense.dto';
import { ExpensesRepository } from './expenses.repository';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.expensesRepository.save(createExpenseDto);
  }

  findAll() {
    return this.expensesRepository.find();
  }

  async findOne(id: string): Promise<Expense> {
    const found = await this.expensesRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Record with id=${id} is not found`);
    }
    return found;
  }

  async update(id: string, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    const result = await this.expensesRepository.update(
      id,
      updateExpenseCategoryDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Record with id=${id} is not found`);
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.expensesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Record with id=${id} is not found`);
    }
    return true;
  }
}
