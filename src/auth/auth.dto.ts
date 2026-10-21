import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
 @ApiProperty() @IsString() @MinLength(2) @MaxLength(80) name!: string;
 @ApiProperty() @IsEmail() email!: string;
 @ApiProperty({minLength:12}) @IsString() @MinLength(12) password!: string;
}
export class LoginDto {
 @ApiProperty() @IsEmail() email!: string;
 @ApiProperty() @IsString() password!: string;
}
