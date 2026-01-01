import { EmpresaDTO } from '@/modules/empresa/empresa.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminEmpresaService } from './admin-empresa.service';
import { PLANOS } from '@/enum/planos.enum';
import { EmpresaService } from '@/modules/empresa/empresa.service';
import { AdminGuard } from '../admin.guard';
import { FuncionarioDTO } from '@/modules/funcionario/funcionario.dto';

interface EmpresaPostRequestBodys {
  empresa: EmpresaDTO;
  funcionario: FuncionarioDTO
}

@Controller('admin-empresa')
@UseGuards(AdminGuard)
export class AdminEmpresaController {

  constructor(
    private readonly adminEmpresaService: AdminEmpresaService,
    private readonly empresaService: EmpresaService
  ) { }

  @Post('/cadastrar')
  cadastrarEmpresa(@Body() payload: EmpresaPostRequestBodys) {
    return this.adminEmpresaService.cadastrarEmpresa(payload.empresa, payload.funcionario);
  }

  @Get('/listar')
  listar() {
    return this.adminEmpresaService.listar()
  }

  @Get('/paginar/:limite')
  paginar(
    @Param('limite') limite: number,
    @Query('plano') plano: string,
    @Query('ordem') ordem: string,
    @Query('cursor') cursor: string,
    @Query('cursorPrev') cursorPrev: string,
  ) {
    return this.adminEmpresaService.paginar({
      limite:Number(limite),
      plano: plano as PLANOS,
      ordem,
      cursor,
      cursorPrev
    })
  }

  @Put('/atualizar-plano/:idEmpresa')
  atualizarPlano(@Param('idEmpresa') idEmpresa: string, @Body('plano') plano: PLANOS) {
    this.adminEmpresaService.atualizarPlano(idEmpresa, plano);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/desativar/:idEmpresa')
  desativar(@Param('idEmpresa') idEmpresa: string) {
    return this.adminEmpresaService.atualizarEstadoEmpresa(idEmpresa, false);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/ativar/:idEmpresa')
  ativar(@Param('idEmpresa') idEmpresa: string) {
    return this.adminEmpresaService.atualizarEstadoEmpresa(idEmpresa, true);
  }

  @Get('/encontrar/:idEmpresa')
  encontrar(@Param('idEmpresa') idEmpresa: string) {
    return this.empresaService.encontrarPorId(idEmpresa);
  }

  @Put('/atualizar/:idEmpresa')
  atualizar(@Body() empresaPayload: Partial<EmpresaDTO>, @Param('idEmpresa') idEmpresa: string) {
    return this.empresaService.atualizar(idEmpresa, empresaPayload);
  }

  @Delete('/excluir/:idEmpresa')
  excluir(@Param('idEmpresa') idEmpresa: string) {
    return this.adminEmpresaService.excluirEmpresa(idEmpresa);
  }

  @Put('/redefinir-senha/:idEmpresa')
  redefinirSenha(@Param('idEmpresa') idEmpresa: string, @Body('senha') senha: string) {
    return this.adminEmpresaService.redefinirSenha(idEmpresa, senha);
  }
}
