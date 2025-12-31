import { forwardRef, Module } from '@nestjs/common';
import { AdminProdutoController } from './admin-produto.controller';
import { AdminProdutoService } from './admin-produto.service';
import { ProdutoModule } from '@/modules/produto/produto.module';

@Module({
  controllers: [AdminProdutoController],
  providers: [AdminProdutoService],
  imports: [
    forwardRef(() => ProdutoModule)
  ],
})
export class AdminProdutoModule {}
