import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['pending', 'in-progress', 'completed'])
  status: string;
}