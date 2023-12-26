import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Performance } from '../../performance/entiites/perfromance.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'reservation',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Performance, (performance) => performance.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column({ type: 'bigint', name: 'performance_id' })
  performance_id: number;
}
