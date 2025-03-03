import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { userRole } from '../../enum/role.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async register(
    email: string,
    username: string,
    password: string,
    role: userRole,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
      role,
    });

    return this.usersRepository.save(newUser);
  }

  // Login feature with email and password validation
  async login(
    email: string,
    password: string,
  ): Promise<{ message: string; user: Partial<User>; token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User  not found');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token upon successful login
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login successful',
      user: { id: user.id, email: user.email, role: user.role },
      token,
    };
  }

  // Return all users (admin only)
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Get a single user by ID
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User  not found');
    }

    return user;
  }

  // Delete a user by ID (admin only)
  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User  not found');
    }
  }
}
