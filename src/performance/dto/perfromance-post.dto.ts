import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class PostPerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  location: string;

  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '공연 일자 및 시간을 입력해주세요.' })
  dateTime: string;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: string;

  // @IsInt()
  // @Min(0, { message: '티켓 갯수는 0 이상이어야 합니다.' })
  // ticketCount: number;
}

export class UpdatePerformanceDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  dateTime: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  category: string;
}

export class FindTitleDto {
  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  title: string;
}
