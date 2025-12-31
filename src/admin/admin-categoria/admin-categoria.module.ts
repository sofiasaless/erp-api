import { forwardRef, Module } from '@nestjs/common';
import { AdminCategoriaController } from './admin-categoria.controller';
import { AdminCategoriaService } from './admin-categoria.service';
import { CategoriaProdutoModule } from '@/modules/categoria-produto/categoria-produto.module';

@Module({
  controllers: [AdminCategoriaController],
  providers: [AdminCategoriaService],
  imports: [
    forwardRef(() => CategoriaProdutoModule)
  ]
})
export class AdminCategoriaModule {}
