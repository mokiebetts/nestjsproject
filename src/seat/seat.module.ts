import { Performance } from '../performance/entiites/perfromance.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat.entities/seat.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Performance, User, Reservation, Seat]),
    UserModule,
  ],
  providers: [SeatService, Repository<Seat>],
  controllers: [SeatController],
  exports: [TypeOrmModule.forFeature([Seat])],
})
export class SeatModule {}
