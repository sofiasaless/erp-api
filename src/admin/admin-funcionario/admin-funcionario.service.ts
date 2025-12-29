import { COLLECTIONS } from '@/enum/firestore.enum';
import { FuncionarioDTO } from '@/modules/funcionario/funcionario.dto';
import { FuncionarioService } from '@/modules/funcionario/funcionario.service';
import { PatternService } from '@/service/pattern.service';
import { criptografarSenha } from '@/util/bcrypt.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminFuncionarioService extends PatternService {

  constructor(private readonly funcionarioService: FuncionarioService) {
    super(COLLECTIONS.FUNCIONARIOS)
  }

  public async atualizar(idFuncionario: string, body: Partial<FuncionarioDTO>) {
    // a senha vai vim sem criptografia, então precisamos criptografar antes de atualizar
    if (body.senha && body.senha !== '' && body.senha !== undefined) {
      body.senha = criptografarSenha(body.senha);
      await this.funcionarioService.atualizar(idFuncionario, body, true);
      return
    }

    await this.funcionarioService.atualizar(idFuncionario, body);
  }

}
