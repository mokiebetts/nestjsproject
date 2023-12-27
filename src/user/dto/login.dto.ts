import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../types/userRole.type';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;

  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '패스워드를 입력해주세요' })
  password: string;

  @IsInt()
  @IsNotEmpty({ message: '포인트를 입력해주세요.' })
  point: number;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '패스워드를 입력해주세요' })
  password: string;
}
