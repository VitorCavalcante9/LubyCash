import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client';

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  client_id: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipcode: number;

  @ManyToOne(() => Client, (client) => client.addresses)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}

export { Address };
