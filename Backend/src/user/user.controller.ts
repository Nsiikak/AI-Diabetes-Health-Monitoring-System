import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userRole } from '../../enum/role.enum';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register endpoint
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: userRole,
  ): Promise<User> {
    return this.userService.register(email, username, password, role);
  }

  // Login endpoint
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ message: string; user: Partial<User>; token: string }> {
    try {
      const response = await this.userService.login(email, password);
      return response; // Return the response to the client
    } catch (error) {
      console.error('Login Error:', error); // Log the error for debugging
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get all users (admin only)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Get a single user by ID
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  // Delete a user by ID (admin only)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
