import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  id: number;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome é uma string' })
  name: string;
}
