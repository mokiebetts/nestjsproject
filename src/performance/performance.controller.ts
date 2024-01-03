import { UserInfo } from 'src/utils/userInfo.decorator';
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
import {
  PostPerformanceDto,
  FindTitleDto,
  UpdatePerformanceDto,
} from './dto/perfromance-post.dto';
import { PerformanceService } from './performance.service';
import { User } from 'src/user/entities/user.entity';

@UseGuards(RolesGuard)
@Controller('performance')
export class PerformanceController {
  articles: any;
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  async findAll() {
    return await this.performanceService.findAll();
  }
  @Get('category/:category')
  async findcategory(@Param('category') category: string) {
    return await this.performanceService.findCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const performanceWithSeat = await this.performanceService.findOne(id);
    return performanceWithSeat;
  }

  @Get('find/find-title')
  async findtitle(@Body() findTitleDto: FindTitleDto) {
    console.log(findTitleDto);
    const title = findTitleDto.title;
    return await this.performanceService.findTitle(title);
  }

  @Roles(Role.Admin)
  @Post()
  async create(
    @UserInfo() user: User,
    @Body() postPerformanceDto: PostPerformanceDto,
  ) {
    const userId = user.id;
    return await this.performanceService.create(userId, postPerformanceDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePerformanceDto: UpdatePerformanceDto,
  ) {
    await this.performanceService.update(id, updatePerformanceDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.performanceService.delete(id);
  }
}
