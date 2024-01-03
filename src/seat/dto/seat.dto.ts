import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class SeatDto {
  @IsNumber()
  @IsNotEmpty({ message: '좌석개수를 입력해주세요.' })
  maxSeatNum: number;

  @IsString()
  @IsNotEmpty({ message: '등급을 입력해주세요.' })
  grade: string;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;
  seatNum: any;
}

export class PostSeatDto {
  @IsNumber()
  @IsNotEmpty({ message: '좌석넘버를 입력해주세요.' })
  SeatNum: number;

  @IsString()
  @IsNotEmpty({ message: '등급을 입력해주세요.' })
  grade: string;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;
  seatNum: any;
}
