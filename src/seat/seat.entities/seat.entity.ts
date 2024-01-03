import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Performance } from '../../performance/entiites/perfromance.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

enum SeatStatus {
  CAN = 'CAN',
  CANT = 'CANT',
}

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', nullable: false })
  seatNum: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  maxSeatNum: number;

  @Column({ type: 'varchar', nullable: false })
  grade: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.CAN })
  status: SeatStatus;

  @ManyToOne(() => Performance, (performance) => performance.seats, {})
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column({ type: 'bigint', name: 'performance_id', nullable: false })
  performanceId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.seat)
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @Column({ type: 'bigint', name: 'reservation_id', nullable: true })
  reservationId: number;

  static SeatStatus = SeatStatus;
}
