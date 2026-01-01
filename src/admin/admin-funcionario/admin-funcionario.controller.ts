import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../admin.guard';
import { AdminFuncionarioService } from './admin-funcionario.service';
import { FuncionarioService } from '@/modules/funcionario/funcionario.service';
import { FuncionarioDTO } from '@/modules/funcionario/funcionario.dto';

@Controller('admin-funcionario')
@UseGuards(AdminGuard)
export class AdminFuncionarioController {

  constructor(
    private readonly adminFuncionarioService: AdminFuncionarioService,
    private readonly funcionarioService: FuncionarioService
  ) {}

  @Get('/listar/:idEmpresa')
  listar(@Param('idEmpresa') idEmpresa: string) {
    return this.funcionarioService.listarTodos(idEmpresa);
  }

  @Delete('/deletar/:idFuncionario')
  deletar(@Param('idFuncionario') idFuncionario: string) {
    return this.funcionarioService.remover(idFuncionario)
  }

  @Post('/cadastrar/:idEmpresa')
  cadastrar(@Param('idEmpresa') idEmpresa: string, @Body() funcionarioBody: FuncionarioDTO) {
    return this.funcionarioService.criar(idEmpresa, funcionarioBody);
  }

  @Put('/atualizar/:idFuncionario')
  atualizar(@Param('idFuncionario') idFuncionario: string, @Body() funcionarioBody: Partial<FuncionarioDTO>) {
    return this.adminFuncionarioService.atualizar(idFuncionario, funcionarioBody);
  }

}
