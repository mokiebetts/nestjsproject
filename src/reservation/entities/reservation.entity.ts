import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Performance } from '../../performance/entiites/perfromance.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reservation_date', type: 'date' })
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
}
