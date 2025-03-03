import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { userRole } from '../../enum/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRole, default: userRole.patient })
  role: userRole;
}
