import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { Address } from './Address';
import { Token } from './Token';

@Entity('clients')
class Client {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  cpf_number: string;

  @Column()
  current_balance: number;

  @Column()
  average_salary: number;

  @Column()
  status: string;

  @Column()
  token?: string;

  @CreateDateColumn()
  token_created_at?: string;

  @CreateDateColumn()
  created_at: string;

  @OneToMany(() => Address, (address) => address.client, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'client_id' })
  addresses: Address[];

  @OneToMany(() => Token, (token) => token.client, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'client_id' })
  tokens: Token[];

  constructor() {
    if (!this.id) this.id = uuid();
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export { Client };
