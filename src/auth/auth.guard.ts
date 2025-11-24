import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extrairTokenDaRequisicao(request)

    try {
      // firebase vai verificar o token automaticamente
      return await getAuth().verifyIdToken(token)
        .then(() => {
          return true;
        })
        .catch((error) => {
          throw new Error(error)
        });

    } catch (error) {
      throw new UnauthorizedException(error)
    }

  }

  private extrairTokenDaRequisicao(request: Request): string {
    const header = request.headers.authorization
    if (!header) throw new UnauthorizedException('Token não identificado');
    const [, token] = header.split(" ");
    return token
  }
}
