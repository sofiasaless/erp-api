import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminUserRequestBody } from './admin-user.dto';
import { CreateRequest, getAuth } from 'firebase-admin/auth';
import { adminAuth } from '@/config/firebase';

@Injectable()
export class AdminUserService {

  public async cadastrarAdmin(body: AdminUserRequestBody) {
    const empresaBodyAuth: CreateRequest = {
      ...body,
      disabled: false,
      emailVerified: false
    }

    return await getAuth().createUser(empresaBodyAuth)
      .then(async (user) => {
        // se tudo deu certo vamos setar a permissão dele
        await this.setUserRole(user.uid, 'admin')
        return user
      })
      .catch((error: any) => {
        throw new HttpException(`Não foi possível criar a empresa: ${error.message}`, HttpStatus.BAD_REQUEST);
      })
  }

  private async setUserRole(uid: string, role: "admin" | "user") {
    await adminAuth.setCustomUserClaims(uid, {
      role,
      active: true
    });
    return { success: true };
  }

}
