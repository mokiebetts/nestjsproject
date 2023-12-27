import { User } from 'src/user/entities/user.entity';

import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  //   Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserInfo } from '../utils/userInfo.decorator';
import { ReservationService } from './reservation.service';
import { PerformanceService } from 'src/performance/performance.service';
import { UserService } from 'src/user/user.service';
@UseGuards(AuthGuard('jwt'))
@Controller('support-message')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly performanceService: PerformanceService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  async getMyReservation(@UserInfo() user: User) {
    const myId = user.id;
    return await this.reservationService.getMyReservations(myId);
  }

  @Post(':performanceId')
  async ticketing(
    @UserInfo() user: User,
    @Param('performanceId') performanceId: number,
  ) {
    const myId = user.id;

    const performance = await this.performanceService.findOne(performanceId);
    const currentUser = await this.userService.getMyInfo(myId);

    if (!performance || performance.ticketCount <= 0) {
      throw new NotFoundException('매진되었습니다.');
    }

    if (currentUser.point < performance.price) {
      throw new BadRequestException('포인트가 부족합니다.');
    }
    const updatedPoint = currentUser.point - performance.price;
    const reduceCount = performance.ticketCount - 1;
    await this.userService.pointSave(myId, updatedPoint);
    await this.performanceService.updateTicketCount(performanceId, reduceCount);

    await this.reservationService.ticketing(performanceId, myId);
  }

  @Delete(':id')
  async cancelticket(@UserInfo() user: User, @Param('id') id: number) {
    const myId = user.id;
    await this.reservationService.cancelticket(id, myId);
  }
}
