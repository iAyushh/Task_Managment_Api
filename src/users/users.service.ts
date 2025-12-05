import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private currentId = 1;

  async create(username: string, password: string, role: string = 'user') {
    const existingUser = this.users.find((u) => u.username === username);

    if (existingUser) {
      throw new ConflictException('User Already Exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
      id: this.currentId++,
      username,
      password: hashedPassword,
      role,
    };

    this.users.push(user);
    const { password: _, ...result } = user;
    return result;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const found = this.users.find((u) => u.username === username);
    console.log('USER FROM ARRAY:', found);
    return found;
  }

  getAllUsers() {
    return this.users.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.password.substring(0, 20) + '...',
    }));
  }
}
