import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get('profile')
  profile() {
    return { message: 'You are logged in' };
  }
}
