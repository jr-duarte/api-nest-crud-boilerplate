import { Todo } from '@domain/todo/entities/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 500 })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.category)
  todo: Todo[];
}
