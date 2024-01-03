import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';

import { Repository } from 'typeorm';
import { Performance } from 'src/performance/entiites/perfromance.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Seat } from 'src/seat/seat.entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, Seat, Performance]),
    UserModule,
  ],
  providers: [ReservationService, Repository<Seat>], // 이 부분을 수정
  controllers: [ReservationController],
  exports: [TypeOrmModule.forFeature([Reservation])],
})
export class ReservationModule {}
