import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');

    }
   

    const isPasswordValid = await bcrypt.compare(password, user.password);

   

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
   

    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, role: user.role },
    };
  }

  async register(username: string, password: string, role: string = 'user') {
    return this.usersService.create(username, password, role);
  }

  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
