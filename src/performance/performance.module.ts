import { PerformanceService } from 'src/performance/performance.service';
import { PerformanceController } from './performance.controller';
import { Performance } from './entiites/perfromance.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '../seat/seat.entities/seat.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([Performance]),
    TypeOrmModule.forFeature([User]),
    UserModule,
    TypeOrmModule.forFeature([Seat]),
  ],
  providers: [PerformanceService, Repository<Performance>, Repository<Seat>],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
