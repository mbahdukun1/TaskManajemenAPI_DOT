import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(['ADMIN', 'USER'] as any)
  role?: 'ADMIN' | 'USER';
}
