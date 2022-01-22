import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TodoModule,
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
