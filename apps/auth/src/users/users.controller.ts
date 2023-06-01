import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './users.service';
import { jwtAuthGuard } from '../guards/jwt-auth.guards';
import { getUserParam } from '../../../../libs/common/src/decorators/getUser-customDecorator';
import { userDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Post('/UserSignUp')
  userSignUp(@Body() bd: UserDto): Promise<UserDto> {
    return this.userService.createUser(bd);
  }

  @UseGuards(jwtAuthGuard)
  @Get('/testAuth')
  test(@getUserParam() user: userDocument) {
    return user;
  }
}
