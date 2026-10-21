import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TaskStatus } from './task.schema';
import { TasksService } from './tasks.service';
class TaskFilter { @IsOptional() @IsEnum(TaskStatus) status?:TaskStatus }
interface AuthenticatedRequest {user:{userId:string,email:string}}
@ApiTags('Tasks') @ApiBearerAuth() @UseGuards(AuthGuard('jwt')) @Controller('tasks')
export class TasksController {
 constructor(private readonly service:TasksService) {}
 @Post() create(@Req() req:AuthenticatedRequest,@Body() dto:CreateTaskDto){return this.service.create(req.user.userId,dto)}
 @Get() list(@Req() req:AuthenticatedRequest,@Query() query:TaskFilter){return this.service.list(req.user.userId,query.status)}
 @Get(':id') get(@Req() req:AuthenticatedRequest,@Param('id') id:string){return this.service.get(req.user.userId,id)}
 @Patch(':id') update(@Req() req:AuthenticatedRequest,@Param('id') id:string,@Body() dto:UpdateTaskDto){return this.service.update(req.user.userId,id,dto)}
 @Delete(':id') remove(@Req() req:AuthenticatedRequest,@Param('id') id:string){return this.service.remove(req.user.userId,id)}
}
