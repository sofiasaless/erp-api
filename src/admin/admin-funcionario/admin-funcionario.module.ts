import { FuncionarioModule } from '@/modules/funcionario/funcionario.module';
import { forwardRef, Module } from '@nestjs/common';
import { AdminFuncionarioService } from './admin-funcionario.service';
import { AdminFuncionarioController } from './admin-funcionario.controller';

@Module({
  providers: [AdminFuncionarioService],
  controllers: [AdminFuncionarioController],
  exports: [AdminFuncionarioService],
  imports: [forwardRef(() => FuncionarioModule)]
})
export class AdminFuncionarioModule { }
