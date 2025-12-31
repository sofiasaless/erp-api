import { CategoriaProdutoService } from '@/modules/categoria-produto/categoria-produto.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('admin-categoria')
export class AdminCategoriaController {

  constructor(
    private readonly categoriaprodutoService: CategoriaProdutoService
  ) {}

  @Post('/cadastrar/:idEmpresa')
  cadastrar(
    @Param('idEmpresa') idEmpresa: string,
    @Body() nome: string
  ) {
    return this.categoriaprodutoService.criar(idEmpresa, nome);
  }

  @Get('/listar/:idEmpresa')
  listar(
    @Param('idEmpresa') idEmpresa: string
  ) {
    return this.categoriaprodutoService.listarTodos(idEmpresa);
  }

}
