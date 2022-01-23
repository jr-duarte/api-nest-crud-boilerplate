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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
// import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService
      .create(createTodoDto)
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
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService
      .update(+id, updateTodoDto)
      .then((todo) => todo)
      .catch((err) => {
        throw new HttpException(
          {
            message: 'Error updating todo',
            error: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todoService.delete(+id).then((result) => {
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
