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

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome é uma string' })
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazio' })
  @IsString({ message: 'A descrição é uma string' })
  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'A categoria não pode ser vazio' })
  @IsOptional()
  @ValidateNested()
  @Type(() => IDCategory)
  category: IDCategory;
}
