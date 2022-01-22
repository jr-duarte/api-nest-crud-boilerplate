import { Connection } from 'typeorm';
import { Todo } from './entities/todo.entity';

export const todoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Todo),
    inject: ['DATABASE_CONNECTION'],
  },
];
