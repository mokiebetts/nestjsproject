import _ from 'lodash';

import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

import {
  FindTitleDto,
  PostPerformanceDto,
  UpdatePerformanceDto,
} from './dto/perfromance-post.dto';
import { Performance } from './entiites/perfromance.entity';

import { Seat } from '../seat/seat.entities/seat.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async findAll(): Promise<Performance[]> {
    return await this.performanceRepository.find({
      select: ['id', 'title', 'dateTime'],
    });
  }

  async findOne(id: number) {
    const performance = await this.verifyPerformanceById(id);
    const performanceId = performance.id;

    const seats = await this.seatRepository.find({
      where: {
        performanceId: performanceId,
      },
    });

    const performanceWithSeat = this.performanceRepository.create({
      ...performance,
      seats: seats,
    });

    return performanceWithSeat;
  }

  async findTitle(title: string) {
    const performance = await this.verifyPerformanceByTitle(title);

    return performance.map(({ id, title, dateTime }) => ({
      id,
      title,
      dateTime,
    }));
  }

  async findCategory(category: string) {
    const performance = await this.verifyPerformanceByCategory(category);
    return performance.map(({ id, title, dateTime }) => ({
      id,
      title,
      dateTime,
    }));
  }

  async create(userId: number, postPerformanceDto: PostPerformanceDto) {
    const createdPerformance = this.performanceRepository.create({
      ...postPerformanceDto,
      userId: userId,
    });
    return await this.performanceRepository.save(createdPerformance);
  }

  async update(id: number, updatePerformanceDto: UpdatePerformanceDto) {
    await this.verifyPerformanceById(id);
    await this.performanceRepository.update({ id }, updatePerformanceDto);
  }

  async delete(id: number) {
    await this.verifyPerformanceById(id);
    await this.performanceRepository.delete({ id });
  }

  private async verifyPerformanceById(id: number) {
    const performance = await this.performanceRepository.findOne({
      where: { id: id },
    });
    if (!performance) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return performance;
  }

  private async verifyPerformanceByTitle(title: string) {
    console.log(title);
    const performance = await this.performanceRepository.find({
      where: { title: ILike(`%${title}%`) },
    });

    if (!performance) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return performance;
  }

  private async verifyPerformanceByCategory(category: string) {
    const performance = await this.performanceRepository.find({
      where: { category: category },
    });
    if (!performance) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return performance;
  }
}
