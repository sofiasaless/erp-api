import { Module } from '@nestjs/common';
import { AdminVendaController } from './admin-venda.controller';
import { AdminVendaService } from './admin-venda.service';

@Module({
  controllers: [AdminVendaController],
  providers: [AdminVendaService]
})
export class AdminVendaModule {}
