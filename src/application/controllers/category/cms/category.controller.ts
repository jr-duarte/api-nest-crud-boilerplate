import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { CreateCategoryDto } from '@domain/category/dto/create-category.dto';
import { Category } from '@domain/category/entities/category.entity';
import { CategoryService } from '@domain/category/category.service';
import { UpdateCategoryDto } from '@domain/category/dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() CreateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService
      .update(+id, updateCategoryDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new HttpException(
            {
              message: `Category ${id} not found`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        return {
          message: `Category ${id} updated`,
        };
      })
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService
      .delete(+id)
      .then((result) => {
        if (result.affected === 0) {
          throw new HttpException(
            {
              message: `Category ${id} not found`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        return {
          message: `Category ${id} deleted`,
        };
      })
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
