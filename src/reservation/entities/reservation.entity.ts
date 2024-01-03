import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Performance } from '../../performance/entiites/perfromance.entity';
import { User } from '../../user/entities/user.entity';
import { Seat } from '../../seat/seat.entities/seat.entity';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'reservation_date', type: 'timestamp' })
  reservationDate: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', name: 'user_id' })
  userId: number;

  @ManyToOne(() => Performance, (performance) => performance.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column({ type: 'bigint', name: 'performance_id' })
  performanceId: number;

  @ManyToOne(() => Seat, (seat) => seat.reservation)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @Column({ type: 'bigint', name: 'seat_id' })
  seatId: number;
}
