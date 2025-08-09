import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
