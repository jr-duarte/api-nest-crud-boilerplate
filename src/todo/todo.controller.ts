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
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
// import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todoService.update(+id, updateTodoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.todoService.remove(+id);
  // }
}
