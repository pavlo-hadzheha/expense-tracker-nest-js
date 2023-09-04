import { EExpenseCategory } from '../category.enum';
import { IsEnum } from 'class-validator';

export class UpdateExpenseCategoryDto {
  @IsEnum(EExpenseCategory)
  category: EExpenseCategory;
}
