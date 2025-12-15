import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import {User , Role} from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}
  

  async create(username: string, password: string, role: Role = Role.USER):Promise<Omit<User,'password'>> {
    const existingUser = await this.prisma.user.findUnique({
      where: {username},
    });

    if (existingUser) {
      throw new ConflictException('User Already Exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data:{
        username,
        password: hashedPassword,
        role ,

      }
    })
    const { password: _, ...result } = user;
    return result;
  }

  async findByUsername(username: string):Promise<User|null> {
    return this.prisma.user.findUnique({
      where: {username},
  })
  }

   async getAllUsers() {
    const users = await this.prisma.user.findMany();

    return users.map((user)=>({
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.password.substring(0,10)+ '...',
    }));
  }
}
