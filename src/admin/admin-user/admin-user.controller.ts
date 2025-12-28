import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import type { AdminUserRequestBody } from './admin-user.dto';
import { AdminUserService } from './admin-user.service';

@Controller('admin-user')
export class AdminUserController {

  constructor(private readonly adminUserService: AdminUserService){}

  @Post('/cadastrar')
  cadastrar(@Body() adminBody: AdminUserRequestBody) {
    try {
      return this.adminUserService.cadastrarAdmin(adminBody);
    } catch (error: any) {
      return new HttpException(error.message as string, HttpStatus.BAD_REQUEST)
    }
  }

}
