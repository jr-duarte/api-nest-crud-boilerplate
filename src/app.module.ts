import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@shared/auth/auth.module';
import { TodoModule } from '@domain/todo/todo.module';
import { CategoryModule } from '@domain/category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TodoModule,
    CategoryModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
