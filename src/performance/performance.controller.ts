import { User } from './../user/entities/user.entity';
import { Role } from './../user/type/userRole.type';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { Performance } from './entiites/perfromance.entity';
import { PostPerformanceDto } from './dto/perfromance-post.dto';
import { PerformanceService } from './performance.service';

@UseGuards(RolesGuard)
@Controller('performance')
export class PerformanceController {
  articles: any;
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  async findAll() {
    return await this.performanceService.findAll();
  }
  @Get(':category')
  async findcategory(@Param('category') category: string) {
    return await this.performanceService.findcategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.performanceService.findOne(id);
  }

  @Get(':id')
  async findtitle(@Body('title') title: string) {
    return await this.performanceService.findtitle(title);
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() postPerformanceDto: PostPerformanceDto) {
    return await this.performanceService.create(postPerformanceDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() postPerformanceDto: PostPerformanceDto,
  ) {
    await this.performanceService.update(id, postPerformanceDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.performanceService.delete(id);
  }
}
