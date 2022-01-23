import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id, { relations: ['category'] });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoRepository.save({
      id: id,
      ...updateTodoDto,
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id);
  }
}
