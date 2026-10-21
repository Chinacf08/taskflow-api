import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TasksService } from './tasks.service';
describe('TasksService',()=>{
 const fakeModel:any={findOne:jest.fn(),findOneAndDelete:jest.fn()};
 const service=new TasksService(fakeModel);
 it('rejects malformed task IDs',async()=>{
  await expect(service.get(new Types.ObjectId().toHexString(),'not-an-id')).rejects.toThrow(NotFoundException);
 });
 it('does not delete a task belonging to another user',async()=>{
  fakeModel.findOneAndDelete.mockResolvedValue(null);
  await expect(service.remove(new Types.ObjectId().toHexString(),new Types.ObjectId().toHexString())).rejects.toThrow(NotFoundException);
  expect(fakeModel.findOneAndDelete).toHaveBeenCalledWith(expect.objectContaining({ownerId:expect.any(Types.ObjectId)}));
 });
});
