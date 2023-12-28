import { Role } from 'src/user/types/userRole.type';
import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Admin, Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto) {
    const existingUser = await this.findByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(userDto.password, 10);
    await this.userRepository.save({
      ...userDto,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async pointSave(myId: number, updatedPoint: number) {
    try {
      await this.userRepository.update(myId, { point: updatedPoint });
    } catch (error) {
      throw new NotFoundException('Failed to update user point');
    }
  }

  async getMyInfo(myId: number) {
    return await this.userRepository.findOne({ where: { id: myId } });
  }

  async uptoAdmin(myId: number) {
    const user = await this.userRepository.findOne({ where: { id: myId } });

    if (user) {
      user.role = Role.Admin;
      await this.userRepository.save(user);
    }
  }
}
