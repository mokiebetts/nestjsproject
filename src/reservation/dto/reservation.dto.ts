import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservationDto {
  @IsNumber()
  @IsNotEmpty({ message: '로그인해주세요.' })
  userId: number;

  @IsNumber()
  @IsNotEmpty({ message: '퍼포먼스 ID를 확인해주세요.' })
  performanceId: number;
}

export class ReservationSeat {
  @IsNumber()
  @IsNotEmpty({ message: '좌석넘버를 입력해주세요.' })
  SeatNum: number;

  @IsString()
  @IsNotEmpty({ message: '등급을 입력해주세요.' })
  grade: string;
}
