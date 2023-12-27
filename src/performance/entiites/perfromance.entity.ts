import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

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

  @Column({ type: 'varchar', nullable: false })
  dateTime: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  seats: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  ticketCount: number;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateStatus() {
    if (this.ticketCount <= 0) {
      this.status = 'SoldOut';
    } else {
      this.status = 'Available for Reservation';
    }
  }

  @OneToMany(() => Reservation, (reservation) => reservation.performance)
  reservations: Reservation[];
}
