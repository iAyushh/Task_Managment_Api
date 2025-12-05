import { Module } from '@nestjs/common';
import { TasksController } from '../task/tasks.contoller';
import { TaskService } from './task.service';

@Module({
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}