import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export enum TaskStatus {TODO='todo',IN_PROGRESS='in_progress',DONE='done'}
@Schema({timestamps:true})
export class Task {
 @Prop({required:true,trim:true}) title!:string;
 @Prop({default:''}) description!:string;
 @Prop({type:String,enum:Object.values(TaskStatus),default:TaskStatus.TODO}) status!:TaskStatus;
 @Prop({type:Types.ObjectId,required:true,index:true}) ownerId!:Types.ObjectId;
 @Prop() dueDate?:Date;
}
export type TaskDocument=HydratedDocument<Task>;
export const TaskSchema=SchemaFactory.createForClass(Task);
TaskSchema.index({ownerId:1,createdAt:-1});
