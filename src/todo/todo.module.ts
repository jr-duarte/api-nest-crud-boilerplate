import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TodoController } from './todo.controller';
import { todoProviders } from './todo.providers';
import { TodoService } from './todo.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...todoProviders, TodoService],
})
export class TodoModule {}
