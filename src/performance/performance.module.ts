import { PerformanceService } from 'src/performance/performance.service';
import { PerformanceController } from './performance.controller';
import { Performance } from './entiites/perfromance.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
