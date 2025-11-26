import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { EstatisticaProdutoService } from './estatistica-produto.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('estatistica-produto')
@UseGuards(AuthGuard)
export class EstatisticaProdutoController {

  constructor(private readonly estatisticaProduto: EstatisticaProdutoService){}

  @Get('/:id')
  encontrar(@Param('id') id: string, @User('uid') uid: string) {
    return this.estatisticaProduto.encontrar(uid, id)
  }
  
}
