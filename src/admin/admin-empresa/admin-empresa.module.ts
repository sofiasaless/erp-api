import { forwardRef, Module } from '@nestjs/common';
import { AdminEmpresaService } from './admin-empresa.service';
import { AdminEmpresaController } from './admin-empresa.controller';
import { EmpresaModule } from '@/modules/empresa/empresa.module';

@Module({
  providers: [AdminEmpresaService],
  controllers: [AdminEmpresaController],
  exports: [AdminEmpresaService],
  imports: [forwardRef(() => EmpresaModule)]
})
export class AdminEmpresaModule { }
