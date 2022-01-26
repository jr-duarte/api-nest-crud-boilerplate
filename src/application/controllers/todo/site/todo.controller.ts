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
import { CreateTodoDto } from '@domain/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@domain/todo/dto/update-todo.dto';
import { Todo } from '@domain/todo/entities/todo.entity';
import { TodoService } from '@domain/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.TodoService.create(createTodoDto)
      .then((todo) => todo)
      .catch((err) => {
        throw new HttpException(
          {
            message: 'Error creating todo',
            error: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Todo[]> {
    return this.TodoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.TodoService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.TodoService.update(+id, updateTodoDto).then((result) => {
      if (result.affected === 0) {
        throw new HttpException(
          {
            message: `Todo ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: `Todo ${id} updated`,
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.TodoService.delete(+id).then((result) => {
      if (result.affected === 0) {
        throw new HttpException(
          {
            message: `Todo ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: `Todo ${id} deleted`,
      };
    });
  }
}
