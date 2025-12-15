import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,envFilePath: '.env'}),
      UsersModule, AuthModule, TasksModule, PrismaModule
  ],
  
 
})
export class AppModule {}
