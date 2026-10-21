import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.schema';
import { LoginDto, RegisterDto } from './auth.dto';
@Injectable()
export class AuthService {
 constructor(@InjectModel(User.name) private readonly users:Model<User>, private readonly jwt:JwtService) {}
 async register(dto:RegisterDto) {
   const email=dto.email.toLowerCase().trim();
   if (await this.users.exists({email})) throw new ConflictException('Email already registered');
   const passwordHash=await bcrypt.hash(dto.password,12);
   try {
     const user=await this.users.create({name:dto.name.trim(),email,passwordHash});
     return {id:String(user._id),name:user.name,email:user.email};
   } catch(e:unknown) {
     if (typeof e==='object' && e!==null && 'code' in e && e.code===11000) throw new ConflictException('Email already registered');
     throw e;
   }
 }
 async login(dto:LoginDto) {
   const user=await this.users.findOne({email:dto.email.toLowerCase().trim()}).select('+passwordHash');
   if (!user || !(await bcrypt.compare(dto.password,user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
   return {accessToken:await this.jwt.signAsync({sub:String(user._id),email:user.email}),tokenType:'Bearer'};
 }
}
