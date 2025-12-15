import { IsString, IsNotEmpty, IsIn, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
   
  @IsOptional()
  @IsEnum(TaskStatus)
  
  status?: TaskStatus;
}