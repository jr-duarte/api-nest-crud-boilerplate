import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/infra/database/database.module';
import { TodoController } from '@application/controllers/todo/cms/todo.controller';
import { todoProviders } from './todo.providers';
import { TodoService } from './todo.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...todoProviders, TodoService],
})
export class TodoModule {}
