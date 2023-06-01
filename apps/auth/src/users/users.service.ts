import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepo } from './user.repository';
import { GetUserDto, UserDto } from './dto/index';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepo) {}

  async createUser(user: UserDto): Promise<UserDto> {
    return this.usersRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 13),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
}
