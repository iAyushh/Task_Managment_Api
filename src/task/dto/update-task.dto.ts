import { TaskStatus } from '@prisma/client';

import { IsString, IsOptional, IsIn, IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  
  status?: TaskStatus;
}
