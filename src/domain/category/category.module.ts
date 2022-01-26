import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/infra/database/database.module';
import { CategoryController } from '@application/controllers/category/site/category.controller';
import { categoryProviders } from './category.providers';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...categoryProviders, CategoryService],
})
export class CategoryModule {}
