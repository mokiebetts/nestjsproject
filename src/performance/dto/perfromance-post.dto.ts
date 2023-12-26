import {
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsDate,
  IsInt,
  Min,
} from 'class-validator';

export class PostPerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  location: string;

  @IsDecimal()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  @IsDate({ each: true })
  @IsNotEmpty({ message: '공연 일자 및 시간을 입력해주세요.' })
  dateTime: Date[];

  @IsString()
  @IsNotEmpty({ message: '좌석 정보를 입력해주세요.' })
  seats: string;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: string;

  @IsInt()
  @Min(0, { message: '티켓 갯수는 0 이상이어야 합니다.' })
  ticketCount: number;
}
