import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../admin.guard';
import { ProdutoService } from '@/modules/produto/produto.service';
import { ProdutoDTO } from '@/modules/produto/produto.dto';

@Controller('admin-produto')
@UseGuards(AdminGuard)
export class AdminProdutoController {

  constructor(
    private readonly produtoService: ProdutoService
  ) {}

  @Get('/paginar/:idEmpresa/:limite')
  paginar(
    @Param('idEmpresa') idEmpresa: string,
    @Param('limite') limite: number,
    @Query('ordem') ordem: string,
    @Query('cursor') cursor: string,
    @Query('cursorPrev') cursorPrev: string,
  ) {
    return this.produtoService.paginarProdutos({
      id_empresa: idEmpresa,
      limite: Number(limite),
      ordem,
      cursor,
      cursorPrev
    })
  }

  @Delete('/deletar/:idProduto/:idEmpresa')
  remover(
    @Param('idProduto') idProduto: string,
    @Param('idEmpresa') idEmpresa: string
  ) {
    this.produtoService.remover(idProduto, idEmpresa);
  }

  @Post('/cadastrar/:idEmpresa')
  criarProduto(
    @Param('idEmpresa') idEmpresa: string,
    @Body() produto: ProdutoDTO
  ) {
    return this.produtoService.criar(idEmpresa, produto);
  }

  @Put('/atualizar/:idProduto/:idEmpresa')
  atualizarProduto(
    @Param('idProduto') idProduto: string,
    @Param('idEmpresa') idEmpresa: string,
    @Body() produto: Partial<ProdutoDTO>
  ) {
    return this.produtoService.atualizarPorId(idProduto, idEmpresa, produto);
  }

}
