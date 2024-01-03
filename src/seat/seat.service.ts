import _ from 'lodash';

import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SeatDto, PostSeatDto } from './dto/seat.dto';
import { Seat } from './seat.entities/seat.entity'; // 수정
import { Performance } from '../performance/entiites/perfromance.entity'; // 수정

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ) {}

  async createSeat(seatDto: SeatDto, performanceId: number) {
    const maxSeatNum = seatDto.maxSeatNum;

    for (let i = 1; i <= maxSeatNum; i++) {
      const newSeat = this.seatRepository.create({
        ...seatDto,
        seatNum: i,
        performanceId: performanceId,
      });
      await this.seatRepository.save(newSeat);
    }
  }

  async postSeat(postSeatDto: PostSeatDto, performanceid: number) {
    await this.checkSeat(postSeatDto, performanceid);
    const newSeat = await this.seatRepository.create({
      ...postSeatDto,
      performanceId: performanceid,
    });

    await this.seatRepository.save(newSeat);
  }

  async deleteSeat(userId: number, seatid: number) {
    await this.verifySeat(userId, seatid);
    await this.seatRepository.delete({ id: seatid });
  }

  private async verifySeat(userId: number, seatid: number) {
    const seat = await this.seatRepository.findOne({ where: { id: seatid } });
    if (!seat) {
      throw new NotFoundException('해당하는 좌석이 없습니다.');
    }

    const performanceId = seat.performanceId;
    const performance = await this.performanceRepository.findOne({
      where: { id: performanceId },
    });

    if (userId !== performance.userId) {
      throw new NotFoundException('권한이 없습니다.');
    }
  }

  private async checkSeat(postSeatDto: PostSeatDto, performanceId: number) {
    const seatNum = postSeatDto.seatNum;
    const seatGrade = postSeatDto.grade;
    const seats = await this.seatRepository.find({
      where: {
        grade: seatGrade,
        performanceId: performanceId,
      },
    });

    for (let i = 0; i < seats.length; i++) {
      if (seats[i].seatNum === seatNum) {
        throw new NotFoundException('이미 좌석이 있습니다.');
      }
    }
  }
}
