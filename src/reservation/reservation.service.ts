import { Performance } from 'src/performance/entiites/perfromance.entity';
import { User } from './../user/entities/user.entity';
import { Seat } from '../seat/seat.entities/seat.entity'; // 수정된 경로
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Seat) private seatRepository: Repository<Seat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getMyReservations(myId: number) {
    return await this.reservationRepository.find({
      where: { userId: myId },
    });
  }

  async ticketing(
    myId: number,
    performanceId: number,
    seatGrade: string,
    seatNum: number,
    userPoint: number,
  ) {
    const newseat = await this.checkNewSeat(seatGrade, seatNum, performanceId);

    if (newseat.status === Seat.SeatStatus.CANT) {
      throw new NotFoundException('이미 예매가 완료된 좌석입니다.');
    }

    newseat.status = Seat.SeatStatus.CANT;

    await this.seatRepository.save(newseat);

    const seatId = newseat.id;

    const updatedPoint = Number(userPoint) - Number(newseat.price);

    await this.userRepository.update(
      { id: myId },
      { point: Number(updatedPoint) },
    );

    const reservation = this.reservationRepository.create({
      performanceId,
      userId: myId,
      seat: newseat,
      seatId: Number(seatId),
    });

    await this.reservationRepository.save(reservation);
  }
  async cancelticket(reservationid: number, myId: number, userPoint: number) {
    await this.verifyTicket(reservationid, myId);

    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationid },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found.');
    }

    const performance = reservation.performance;
    if (performance.isCancellationAllowed()) {
    } else {
      throw new NotFoundException('공연 3시간전에는 취소할 수 없습니다.');
    }

    const seatId = Number(reservation.seatId);
    const newseat = await this.seatRepository.findOne({
      where: { id: seatId },
    });

    if (newseat.status === Seat.SeatStatus.CAN) {
      throw new NotFoundException('예약된 좌석이 아닙니다.');
    }

    newseat.status = Seat.SeatStatus.CAN;

    await this.seatRepository.save(newseat);

    const updatedPoint = Number(userPoint) + Number(newseat.price);

    await this.userRepository.update(
      { id: myId },
      { point: Number(updatedPoint) },
    );

    await this.reservationRepository.remove(reservation);
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: id },
    });
    if (!reservation) {
      throw new NotFoundException('존재하지 않는 예약입니다.');
    }

    return reservation;
  }

  private async verifyTicket(reservationid: number, myId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationid },
    });

    if (!reservation || reservation.userId !== myId) {
      throw new NotFoundException('권한이 없습니다.');
    }
  }

  private async checkNewSeat(
    seatGrade: string,
    seatNum: number,
    performanceId: number,
  ) {
    const seat = await this.seatRepository.findOne({
      where: {
        seatNum: seatNum,
        grade: seatGrade,
        performanceId: performanceId,
      },
    });

    if (!seat) {
      throw new NotFoundException(
        '존재하지 않는 좌석이거나 등급이 일치하지 않습니다.',
      );
    }

    return seat;
  }
}
