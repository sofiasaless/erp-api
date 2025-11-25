import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categoria-produto')
@UseGuards(AuthGuard)
export class CategoriaProdutoController {
}
