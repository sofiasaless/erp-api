import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../admin.guard';
import { AdminEmpresaService } from './admin-empresa.service';
import { EmpresaDTO } from '@/modules/empresa/empresa.dto';

@Controller('admin-empresa')
@UseGuards(AdminGuard)
export class AdminEmpresaController {

  constructor(private readonly adminEmpresaService: AdminEmpresaService){}

  @Post('/cadastrar')
  cadastrarEmpresa(@Body() empresa: EmpresaDTO) {
    this.adminEmpresaService.cadastrarEmpresa(empresa);
  }
  
  @Put('/atualizar-plano')
  atualizarPlano() {
    
  }

}
