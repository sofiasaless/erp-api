import { Module } from '@nestjs/common';
import { DicionarioController } from './dicionario.controller';
import { DicionarioService } from './dicionario.service';

@Module({
  controllers: [DicionarioController],
  providers: [DicionarioService],
  exports: [DicionarioService]
})
export class DicionarioModule {}
