import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PerformanceService } from './../performance/performance.service';

import { Performance } from 'src/performance/entiites/perfromance.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([Performance]),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  providers: [ReservationService, PerformanceService],
  controllers: [ReservationController],
})
export class ReservationModule {}
