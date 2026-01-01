import { EmpresaModule } from '@/modules/empresa/empresa.module';
import { forwardRef, Module } from '@nestjs/common';
import { AdminFuncionarioModule } from '../admin-funcionario/admin-funcionario.module';
import { AdminEmpresaController } from './admin-empresa.controller';
import { AdminEmpresaService } from './admin-empresa.service';
import { CategoriaProdutoModule } from '@/modules/categoria-produto/categoria-produto.module';
import { DicionarioModule } from '@/modules/dicionario/dicionario.module';
import { EstatisticaProdutoModule } from '@/modules/estatistica-produto/estatistica-produto.module';
import { ProdutoModule } from '@/modules/produto/produto.module';
import { FluxoCaixaModule } from '@/modules/fluxo-caixa/fluxo-caixa.module';
import { FuncionarioModule } from '@/modules/funcionario/funcionario.module';
import { VendaModule } from '@/modules/venda/venda.module';

@Module({
  providers: [AdminEmpresaService],
  controllers: [AdminEmpresaController],
  imports: [
    forwardRef(() => EmpresaModule),
    forwardRef(() => AdminFuncionarioModule),
    forwardRef(() => CategoriaProdutoModule),
    forwardRef(() => DicionarioModule),
    forwardRef(() => EstatisticaProdutoModule),
    forwardRef(() => ProdutoModule),
    forwardRef(() => FluxoCaixaModule),
    forwardRef(() => FuncionarioModule),
    forwardRef(() => VendaModule),
  ],
  exports: [AdminEmpresaService],
})
export class AdminEmpresaModule { }
