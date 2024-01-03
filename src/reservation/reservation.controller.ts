import { User } from 'src/user/entities/user.entity';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserInfo } from '../utils/userInfo.decorator';
import { ReservationService } from './reservation.service';
import { ReservationSeat } from './dto/reservation.dto';
@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('')
  async getMyReservation(@UserInfo() user: User) {
    const myId = user.id;
    return await this.reservationService.getMyReservations(myId);
  }

  @Post(':performanceId')
  async ticketing(
    @UserInfo() user: User,
    @Param('performanceId') performanceId: number,
    @Body() reservationSeat: ReservationSeat,
  ) {
    const myId = user.id;
    const seatNum = reservationSeat.SeatNum;
    const seatGrade = reservationSeat.grade;
    const userPoint = user.point;

    await this.reservationService.ticketing(
      myId,
      performanceId,
      seatGrade,
      seatNum,
      userPoint,
    );
  }
  @Delete('delete/:reservationid')
  async cancelticket(
    @UserInfo() user: User,
    @Param('reservationid') reservationid: number,
  ) {
    const myId = user.id;
    const userPoint = user.point;
    await this.reservationService.cancelticket(reservationid, myId, userPoint);
  }
}
