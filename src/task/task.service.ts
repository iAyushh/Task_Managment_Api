import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Task, Role } from '@prisma/client';



@Injectable()
export class TaskService{ 
  constructor (private prisma: PrismaService){}
  
  async create(createTaskDto: CreateTaskDto, userId: number):Promise <Task> {
   return this.prisma.task.create({
      data:{
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        userId: userId,

      }
    });
  }
  findMyTasks(userId: number): Promise<Task[]>{
    return this.prisma.task.findMany({
      where:{userId},
    })
  }

 async findOne(id: number, userId: number, role: Role): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {id},
    })
    if(!task){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if(role!== Role.ADMIN && task.userId !== userId){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update( 
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
    role: Role

  ): Promise<Task>{
    const task = await this.findOne(id, userId, role);
    return this.prisma.task.update({
      where: {id: task.id},
      data:{
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status,
      },
    });
  }

  async remove(id: number, userId:number, role: Role):Promise<void>{
    const task = await this.findOne(id, userId, role);
    await this.prisma.task.delete({
      where: {id:task.id},
    });
  }

  
}
