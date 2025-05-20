import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationAction } from '../const';
import { User } from './user.entity';
import { Concert } from './concert.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  concertId: string;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.reservations, {
    onDelete: 'CASCADE',
  })
  concert: Concert;

  @Column({
    type: 'enum',
    enum: ReservationAction,
    default: ReservationAction.RESERVE,
  })
  action: ReservationAction;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
