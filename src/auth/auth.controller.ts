import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {

  @Get()
  testToken() {
    return 'testando autenticação com token'
  }
}
