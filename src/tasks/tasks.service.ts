import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task, TaskStatus } from './task.schema';
@Injectable()
export class TasksService {
 constructor(@InjectModel(Task.name) private readonly tasks:Model<Task>){}
 create(userId:string,dto:CreateTaskDto){return this.tasks.create({...dto,ownerId:new Types.ObjectId(userId)});}
 list(userId:string,status?:TaskStatus){return this.tasks.find({ownerId:new Types.ObjectId(userId),...(status?{status}:{})}).sort({createdAt:-1}).exec();}
 async get(userId:string,id:string){
   if(!Types.ObjectId.isValid(id)) throw new NotFoundException('Task not found');
   const task=await this.tasks.findOne({_id:id,ownerId:new Types.ObjectId(userId)});
   if(!task) throw new NotFoundException('Task not found');
   return task;
 }
 async update(userId:string,id:string,dto:UpdateTaskDto){
   if(!Types.ObjectId.isValid(id)) throw new NotFoundException('Task not found');
   const task=await this.tasks.findOneAndUpdate({_id:id,ownerId:new Types.ObjectId(userId)},{$set:dto},{new:true,runValidators:true});
   if(!task) throw new NotFoundException('Task not found');
   return task;
 }
 async remove(userId:string,id:string){
   if(!Types.ObjectId.isValid(id)) throw new NotFoundException('Task not found');
   const task=await this.tasks.findOneAndDelete({_id:id,ownerId:new Types.ObjectId(userId)});
   if(!task) throw new NotFoundException('Task not found');
   return {deleted:true};
 }
}
