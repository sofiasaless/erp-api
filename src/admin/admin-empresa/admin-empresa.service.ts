import { adminAuth, db } from '@/config/firebase';
import { COLLECTIONS } from '@/enum/firestore.enum';
import { EmpresaDTO } from '@/modules/empresa/empresa.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRequest, getAuth } from 'firebase-admin/auth';

@Injectable()
export class AdminEmpresaService {
  private setup(collectionName: COLLECTIONS) {
    return db.collection(collectionName)
  }

  private docToObject(id: string, data: FirebaseFirestore.DocumentData): EmpresaDTO {
    return {
      id: id,
      nome: data.nome,
      plano: data.plano,
      atalhos_rapidos: data.atalhos_rapidos,
      cnpj: data.cnpj,
      descricao: data.descricao,
      endereco: data.endereco,
      img_perfil: data.img_perfil,
      senha: data.senha,
      taxa_servico: data.taxa_servico,
      email: data.email,
      email_contato: data.email_contato,
      data_criacao: data.data_criacao?.toDate()
    }
  }

  public async cadastrarEmpresa(empresa: EmpresaDTO): Promise<EmpresaDTO> {
    // validações
    if (empresa.senha === undefined || empresa.senha === '') throw new HttpException("Necessário preencher senha", HttpStatus.BAD_REQUEST)

    // body que vai ser salvo no auth
    const empresaBodyAuth: CreateRequest = {
      displayName: empresa.nome,
      email: await this.gerarEmail(empresa.nome),
      photoURL: empresa.img_perfil,
      password: empresa.senha,
      disabled: false,
      emailVerified: false
    }

    return await getAuth().createUser(empresaBodyAuth)
      .then(async (user) => {
        // se tudo deu certo vamos setar a permissão dele
        await this.setUserRole(user.uid, 'user')

        // só então salvar a empresa no firestore
        empresa.email = user.email!
        empresa.senha = ''
        empresa.data_criacao = new Date()
        const empresaRef = this.setup(COLLECTIONS.EMPRESAS).doc(user.uid)
        await empresaRef.set(empresa)

        return this.docToObject(user.uid, (await empresaRef.get()).data()!)
      })
      .catch((error) => {
        throw new HttpException(`Não foi possível criar a empresa ${error}`, HttpStatus.BAD_REQUEST);
      })

  }

  private async setUserRole(uid: string, role: "admin" | "user") {
    await adminAuth.setCustomUserClaims(uid, { role });
    return { success: true };
  }

  private async gerarEmail(nomeEmpresa: string) {
    let baseNome = nomeEmpresa
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^a-z0-9]/g, ""); // remove caracteres especiais/espacos

    // verificar se esse email ja nao EXISTE NO FIRESTORE E NO AUTH
    // .... implementar posteriormente

    return `${baseNome}@upbusiness.com`
  }

}
