import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';

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

  @Column({ type: 'timestamp', array: true, default: [], nullable: false })
  dateTime: Date[];

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

  @Column({ type: 'boolean', nullable: false, default: false })
  soldout: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.performance)
  reservations: Reservation[];
}
