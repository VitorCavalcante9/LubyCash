import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

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
  phone: number;

  @Column()
  cpf_number: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipcode: number;

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
