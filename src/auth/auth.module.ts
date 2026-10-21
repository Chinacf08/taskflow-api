import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../users/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
@Module({imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}]), PassportModule, JwtModule.registerAsync({inject:[ConfigService],useFactory:(config:ConfigService)=>({secret:config.getOrThrow<string>('JWT_SECRET'),signOptions:{expiresIn:'1h'}})})], controllers:[AuthController],providers:[AuthService,JwtStrategy]})
export class AuthModule {}
