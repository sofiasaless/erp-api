import { adminAuth, db } from '@/config/firebase';
import { COLLECTIONS } from '@/enum/firestore.enum';
import { PLANOS } from '@/enum/planos.enum';
import { EmpresaDTO } from '@/modules/empresa/empresa.dto';
import { PatternService } from '@/service/pattern.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRequest, getAuth } from 'firebase-admin/auth';

@Injectable()
export class AdminEmpresaService extends PatternService {

  constructor() {
    super(COLLECTIONS.EMPRESAS)
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
      estado: data.estado,
      telefone: data.telefone,
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
        await this.setUserClaims(user.uid, 'user')

        // só então salvar a empresa no firestore
        empresa.email = user.email!
        empresa.senha = ''
        empresa.estado = true
        empresa.data_criacao = new Date()
        const empresaRef = this.setup().doc(user.uid)
        await empresaRef.set(empresa)

        return this.docToObject(user.uid, (await empresaRef.get()).data()!)
      })
      .catch((error) => {
        throw new HttpException(`Não foi possível criar a empresa ${error}`, HttpStatus.BAD_REQUEST);
      })

  }

  public async listar() {
    const snap = (await this.setup().get()).docs

    const empresas = snap.map((doc) => {
      return this.docToObject(doc.id, doc.data())
    })

    return empresas
  }

  public async paginar({
    limite,
    ordem,
    cursor,
    cursorPrev,
    plano,
  }: {
    limite: number;
    ordem?: string;
    cursor?: string;      // próximo
    cursorPrev?: string;  // anterior
    plano?: PLANOS;
  }) {
    let query = this.setup().orderBy(ordem ?? "data_criacao", "desc");

    if (plano) query = query.where("plano", "==", plano);

    // depois de fazer todas as filtragens, pegar o total
    const total = await query.count().get();

    let snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;

    // Indo para a próxima página
    if (cursor) {
      const cursorDoc = await this.setup().doc(cursor).get();
      snapshot = await query.startAfter(cursorDoc).limit(limite).get();
    }
    // Voltando para a página anterior
    else if (cursorPrev) {
      const cursorDoc = await this.setup().doc(cursorPrev).get();
      snapshot = await query.endBefore(cursorDoc).limitToLast(limite).get();
    }
    // Primeira página
    else {
      snapshot = await query.limit(limite).get();
    }

    const empresas: EmpresaDTO[] = snapshot.docs.map(doc => ({
      ...this.docToObject(doc.id, doc.data())
    }));

    const first = snapshot.docs[0];
    const last = snapshot.docs[snapshot.docs.length - 1];

    return {
      empresas,
      total: total.data().count,
      nextCursor: last?.id ?? null,
      prevCursor: first?.id ?? null,
    };
  };

  public async atualizarPlano(idEmpresa: string, plano: PLANOS) {
    const empresaRef = this.setup().doc(idEmpresa);
    await empresaRef.update({
      plano: plano
    })
  }

  public async atualizarEstadoEmpresa(idEmpresa: string, ativacao: boolean) {
    await this.setUserClaims(idEmpresa, 'user', ativacao);

    await adminAuth.updateUser(idEmpresa, {
      disabled: !ativacao
    });

    await this.setup().doc(idEmpresa).update({
      estado: ativacao
    });
  }

  private async setUserClaims(uid: string, role: "admin" | "user", active: boolean = true) {
    await adminAuth.setCustomUserClaims(uid, {
      role,
      active: active
    });
    return { success: true };
  }

  public async estaDesativada(idEmpresa: string) {
    return (await getAuth().getUser(idEmpresa)).disabled
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
