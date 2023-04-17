import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = {
      sub: user.user_id,
      user: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findOneOrFail({
        where: { username: username },
        select: ['password', 'username', 'user_id'],
      });
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async getUserByReq(req) {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      const payload = this.jwtService.decode(token) as JwtPayload;
      return payload;
    }
    return null;
  }
}
