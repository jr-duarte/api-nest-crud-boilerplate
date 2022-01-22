import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
// import { UpdateCategoryDto } from './dto/update-todo.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService
      .create(CreateCategoryDto)
      .then((category) => category)
      .catch((err) => {
        throw new HttpException(
          {
            message: 'Error creating category',
            error: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.categoryService.update(+id, updateTodoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}
