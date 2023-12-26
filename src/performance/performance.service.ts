import _ from 'lodash';

import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

import { PostPerformanceDto } from './dto/perfromance-post.dto';
import { Performance } from './entiites/perfromance.entity';

@Injectable()
export class PerformanceService {
  articles: any;
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ) {}

  async findAll(): Promise<Performance[]> {
    return await this.performanceRepository.find({
      select: ['id', 'title'],
    });
  }

  async findOne(id: number) {
    return await this.verifyPerformanceById(id);
  }

  async findtitle(title: string) {
    return await this.verifyPerformanceByTitle(title);
  }

  async findcategory(category: string) {
    return await this.verifyPerformanceByCategory(category);
  }

  async create(postPerformanceDto: PostPerformanceDto) {
    const createdPerformance =
      this.performanceRepository.create(postPerformanceDto);
    return await this.performanceRepository.save(createdPerformance);
  }

  async update(id: number, updatePerformanceDto: PostPerformanceDto) {
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