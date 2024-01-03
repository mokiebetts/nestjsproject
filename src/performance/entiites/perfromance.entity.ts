import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Seat } from '../../seat/seat.entities/seat.entity';

@Entity({
  name: 'performance',
})
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  dateTime: Date;
  // dateTime = new Date('2023-01-01T15:30:00');

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.performances)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Reservation, (reservation) => reservation.performance)
  reservations: Reservation[];

  @OneToMany(() => Seat, (seat) => seat.performance, {
    nullable: true,
    cascade: true,
  })
  seats: Seat[];

  isCancellationAllowed(): boolean {
    const now = new Date();

    const cancellationLimit = new Date(this.dateTime);
    cancellationLimit.setHours(this.dateTime.getHours() - 3);

    return now >= cancellationLimit;
  }
}
