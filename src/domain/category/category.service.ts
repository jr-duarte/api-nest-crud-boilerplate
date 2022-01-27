import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['todo'] });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id, { relations: ['todo'] });
  }

  async update(
    _id: number,
    updateTodoDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    const { id, ...data } = updateTodoDto;
    return this.categoryRepository.update(_id, data);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
}
