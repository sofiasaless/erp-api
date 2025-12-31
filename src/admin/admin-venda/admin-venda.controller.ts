import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdminVendaService } from './admin-venda.service';

@Controller('admin-venda')
export class AdminVendaController {

  constructor(
    private readonly adminVendaService: AdminVendaService,
  ) {}

  @Get('/paginar/:idEmpresa/:limite')
  paginar(
    @Param('idEmpresa') idEmpresa: string,
    @Param('limite') limite: number,
    @Query('cursor') cursor: string,
    @Query('cursorPrev') cursorPrev: string,
  ) {
    return this.adminVendaService.paginar({
      id_empresa: idEmpresa,
      limite: Number(limite),
      cursor: cursor,
      cursorPrev: cursorPrev
    });
  }

}
