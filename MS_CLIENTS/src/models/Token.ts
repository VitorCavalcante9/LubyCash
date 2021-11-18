import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client';

@Entity('tokens')
class Token {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  client_id: string;

  @Column()
  token: string;

  @Column()
  type: string;

  @Column()
  is_revoked: boolean;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => Client, (client) => client.tokens)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}

export { Token };
