import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { CategoriaProdutoModule } from './modules/categoria-produto/categoria-produto.module';
import { DicionarioModule } from './modules/dicionario/dicionario.module';
import { EstatisticaProdutoModule } from './modules/estatistica-produto/estatistica-produto.module';
import { VendaModule } from './modules/venda/venda.module';
import { FluxoCaixaModule } from './modules/fluxo-caixa/fluxo-caixa.module';
import { AdminEmpresaModule } from './admin/admin-empresa/admin-empresa.module';
import { AdminUserModule } from './admin/admin-user/admin-user.module';
import { AdminFuncionarioController } from './admin/admin-funcionario/admin-funcionario.controller';
import { AdminFuncionarioService } from './admin/admin-funcionario/admin-funcionario.service';
import { AdminFuncionarioModule } from './admin/admin-funcionario/admin-funcionario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutoModule,
    EmpresaModule,
    AuthModule,
    FuncionarioModule,
    CategoriaProdutoModule,
    DicionarioModule,
    EstatisticaProdutoModule,
    VendaModule,
    FluxoCaixaModule,
    AdminEmpresaModule,
    AdminUserModule,
    AdminFuncionarioModule
  ],
  controllers: [AppController, AdminFuncionarioController],
  providers: [AppService, AdminFuncionarioService],
})
export class AppModule {}
