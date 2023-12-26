import { Performance } from './entiites/perfromance.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}