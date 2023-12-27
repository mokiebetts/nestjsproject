import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto, UserDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return await this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin')
  async uptoAdmin(@UserInfo() user: User) {
    const myId = user.id;
    return await this.userService.uptoAdmin(myId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('myInfo')
  async getMyInfo(@UserInfo() user: User) {
    const myId = user.id;
    return await this.userService.getMyInfo(myId);
  }
}
