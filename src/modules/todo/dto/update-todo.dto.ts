import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';

class IDCategory {
  @IsNotEmpty({ message: 'O id é obrigatório' })
  @IsNumber({}, { message: 'O id é um number' })
  id: number;
}
export class UpdateTodoDto {
  id: number;

  @IsString({ message: 'O nome é uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição é uma string' })
  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsOptional()
  @ValidateNested()
  @Type(() => IDCategory)
  category: IDCategory;
}
