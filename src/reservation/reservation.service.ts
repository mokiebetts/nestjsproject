import { Performance } from './../performance/entiites/perfromance.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async getMyReservations(myId: number) {
    return await this.reservationRepository.find({
      where: { userId: myId },
    });
  }

  async ticketing(performanceId: number, myId: number) {
    const reservation = this.reservationRepository.create({
      performanceId,
      userId: myId,
    });

    await this.reservationRepository.save(reservation);

    return reservation;
  }

  async cancelticket(id: number, myId: number) {
    await this.verifyTicket(id, myId);

    const reservation = await this.reservationRepository.findOne({
      where: { id: id },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found.');
    }

    console.log(reservation);

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

  private async verifyTicket(id: number, myId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!reservation || reservation.userId !== myId) {
      throw new NotFoundException('권한이 없습니다.');
    }
  }
}
