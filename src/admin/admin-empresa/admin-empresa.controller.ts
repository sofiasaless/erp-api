import { EmpresaDTO } from '@/modules/empresa/empresa.dto';
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminEmpresaService } from './admin-empresa.service';
import { PLANOS } from '@/enum/planos.enum';
import { EmpresaService } from '@/modules/empresa/empresa.service';
import { AdminGuard } from '../admin.guard';

@Controller('admin-empresa')
@UseGuards(AdminGuard)
export class AdminEmpresaController {

  constructor(
    private readonly adminEmpresaService: AdminEmpresaService,
    private readonly empresaService: EmpresaService
  ) { }

  @Post('/cadastrar')
  cadastrarEmpresa(@Body() empresa: EmpresaDTO) {
    this.adminEmpresaService.cadastrarEmpresa(empresa);
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

  @Put('/desativar/:idEmpresa')
  desativar(@Param('idEmpresa') idEmpresa: string) {
    return this.adminEmpresaService.atualizarEstadoEmpresa(idEmpresa, false);
  }

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

}
