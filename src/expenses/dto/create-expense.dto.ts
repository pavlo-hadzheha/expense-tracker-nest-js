import { IsEnum, IsNumber, MaxLength, MinLength } from 'class-validator';
import { EExpenseCategory } from '../category.enum';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsEnum(EExpenseCategory)
  category: EExpenseCategory;

  @MinLength(0)
  @MaxLength(50)
  comment: string;
}
