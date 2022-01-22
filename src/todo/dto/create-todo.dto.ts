import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';

class IDCategory {
  @IsNotEmpty({ message: 'O id é obrigatório' })
  @IsNumber({}, { message: 'O id é um number' })
  id: number;
}
export class CreateTodoDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome é uma string' })
  name: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição é uma string' })
  description: string;

  @ValidateNested()
  @Type(() => IDCategory)
  category: IDCategory;
}
