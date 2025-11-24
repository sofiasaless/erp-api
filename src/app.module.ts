import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { ProdutoService } from './produto/produto.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutoModule
  ],
  controllers: [AppController],
  providers: [AppService, ProdutoService],
})
export class AppModule {}
