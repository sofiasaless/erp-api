import { COLLECTIONS } from '@/enum/firestore.enum';
import { FuncionarioDTO } from '@/modules/funcionario/funcionario.dto';
import { FuncionarioService } from '@/modules/funcionario/funcionario.service';
import { PatternService } from '@/service/pattern.service';
import { criptografarSenha } from '@/util/bcrypt.util';
import { idToDocumentRef } from '@/util/firestore.util';
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

  public criarPrimeiroFuncionario(transaction: FirebaseFirestore.Transaction, idEmpresa: string, funcionario: FuncionarioDTO) {
    const funcionarioParaSalvar: FuncionarioDTO = {
      ...funcionario,
      ativo: true,
      empresa_reference: idToDocumentRef(idEmpresa, COLLECTIONS.EMPRESAS),
      senha: criptografarSenha(funcionario.senha!),
      data_criacao: new Date()
    }

    const funcionarioRef = this.setup().doc()
    transaction.set(funcionarioRef, funcionarioParaSalvar)
  }

}
