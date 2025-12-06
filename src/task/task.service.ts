import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  userId: number;
  createdAt: Date;
}

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private currentId = 1;

  create(createTaskDto: CreateTaskDto, userId: number): Task {
    const task: Task = {
      id: this.currentId++,
      ...createTaskDto,
      userId,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll(userId?: number, role?: string): Task[] {
    if (role === 'admin') {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.userId === userId);
  }

  findOne(id: number, userId: number, role: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if (role !== 'admin' && task.userId !== userId) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
    role: string,
  ): Task {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const task = this.tasks[taskIndex];
    if (role !== 'admin' && task.userId !== userId) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks[taskIndex] = { ...task, ...(updateTaskDto.title !== undefined && updateTaskDto.title !== ''&& { title: updateTaskDto.title } ), ...(updateTaskDto.description !== undefined && updateTaskDto.description !== '' && { description: updateTaskDto.description } ), ...(updateTaskDto.status !== undefined && updateTaskDto.status !== '' && { status: updateTaskDto.status } )
      
    };
    return this.tasks[taskIndex];
  }

  remove(id: number, userId: number, role: string): void {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const task = this.tasks[taskIndex];
    if (role !== 'admin' && task.userId !== userId) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
  }
}
