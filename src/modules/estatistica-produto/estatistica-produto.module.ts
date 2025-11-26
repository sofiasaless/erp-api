import { Module } from '@nestjs/common';
import { EstatisticaProdutoController } from './estatistica-produto.controller';
import { EstatisticaProdutoService } from './estatistica-produto.service';

@Module({
  controllers: [EstatisticaProdutoController],
  providers: [EstatisticaProdutoService],
  exports: [EstatisticaProdutoService]
})
export class EstatisticaProdutoModule {}
