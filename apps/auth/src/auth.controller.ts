import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth.guards';
import { userDocument } from './users/models/user.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard, getUserParam } from '@app/common';
import { jwtAuthGuard } from './guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(localAuthGuard)
  @Post('/login')
  async Login(
    @getUserParam() user: userDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.Login(user, response);
    response.send(jwt);
  }

  @UseGuards(jwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
