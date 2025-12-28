import { adminAuth } from '@/config/firebase';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AdminGuard implements CanActivate {

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extrairTokenDaRequisicao(request);

    try {
      // firebase vai verificar o token automaticamente
      const decodedToken = await getAuth().verifyIdToken(token);

      (request as any).user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        claims: (await adminAuth.getUser(decodedToken.uid)).customClaims
      }

      if ((request as any).user.claims.role === 'admin') {
        return true
      }

      return false
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
