import { Module } from '@nestjs/common';
import { AdminEmpresaService } from './admin-empresa.service';
import { AdminEmpresaController } from './admin-empresa.controller';

@Module({
  providers: [AdminEmpresaService],
  controllers: [AdminEmpresaController],
  exports: [AdminEmpresaService]
})
export class AdminEmpresaModule {}
