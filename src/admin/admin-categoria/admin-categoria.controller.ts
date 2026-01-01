import { CategoriaProdutoService } from '@/modules/categoria-produto/categoria-produto.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('admin-categoria')
export class AdminCategoriaController {

  constructor(
    private readonly categoriaprodutoService: CategoriaProdutoService
  ) {}

  @Post('/cadastrar/:idEmpresa')
  cadastrar(
    @Param('idEmpresa') idEmpresa: string,
    @Body('nome') nome: string
  ) {
    return this.categoriaprodutoService.criar(idEmpresa, nome);
  }

  @Get('/listar/:idEmpresa')
  listar(
    @Param('idEmpresa') idEmpresa: string
  ) {
    return this.categoriaprodutoService.listarTodos(idEmpresa);
  }

  @Put('/atualizar/:idCategoria')
  atualizar(
    @Param('idCategoria') idCategoria: string,
    @Body('nome') nome: string
  ) {
    return this.categoriaprodutoService.atualizar(idCategoria, nome);
  }

  @Delete('/excluir/:idCategoria')
  remover(
    @Param('idCategoria') idCategoria: string
  ) {
    return this.categoriaprodutoService.remover(idCategoria);
  }

}
