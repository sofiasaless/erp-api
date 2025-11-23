import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoDTO } from './produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) { }

  @Post()
  criar(@Body() produto: ProdutoDTO) {
    this.produtoService.criar(produto)
  }
  
  @Get()
  listarTodos() {
    return this.produtoService.listarTodos()
  }

  @Delete('/deletar/:id')
  remover(@Param('id') id: string) {
    this.produtoService.remover(id)
  }

  @Get('/encontrar/:id')
  encontrarPorId(@Param('id') id: string) {
    return this.produtoService.encontrarPorId(id);
  }

  @Put('/atualizar/:id')
  atualizarPorId(@Param('id') id: string) {
    
  }

}
