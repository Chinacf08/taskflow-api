import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TaskStatus } from './task.schema';
export class CreateTaskDto {
 @ApiProperty() @IsString() @MinLength(1) @MaxLength(120) title!:string;
 @ApiProperty({required:false}) @IsOptional() @IsString() @MaxLength(1500) description?:string;
 @ApiProperty({enum:TaskStatus,required:false}) @IsOptional() @IsEnum(TaskStatus) status?:TaskStatus;
 @ApiProperty({required:false}) @IsOptional() @IsISO8601() dueDate?:string;
}
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
