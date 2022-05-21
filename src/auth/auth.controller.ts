import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Public } from './guard/public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Post('register')
  async register(@Request() req): Promise<User> {
    return await this.authService.registerUser(req.body);
  }
}
