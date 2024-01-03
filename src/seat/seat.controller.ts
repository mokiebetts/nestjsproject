import { UserInfo } from 'src/utils/userInfo.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatDto, PostSeatDto } from './dto/seat.dto';

import { User } from 'src/user/entities/user.entity';

@UseGuards(RolesGuard)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Roles(Role.Admin)
  @Post('create/:performanceid')
  async createSeat(
    @Param('performanceid') performanceid: number,
    @Body() seatDto: SeatDto,
  ) {
    return await this.seatService.createSeat(seatDto, performanceid);
  }

  @Roles(Role.Admin)
  @Delete('delete/:seatid')
  async deleteSeat(@UserInfo() user: User, @Param('seatid') seatid: number) {
    const userId = user.id;
    await this.seatService.deleteSeat(userId, seatid);
  }

  @Roles(Role.Admin)
  @Post('post/:performanceid')
  async postSeat(
    @Param('performanceid') performanceid: number,
    @Body() postSeatDto: PostSeatDto,
  ) {
    return await this.seatService.postSeat(postSeatDto, performanceid);
  }
}
