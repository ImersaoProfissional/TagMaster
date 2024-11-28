import { Injectable, NestMiddleware, Request } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
  private static usersActivity = new Map<string, NodeJS.Timeout>();
  private static blacklist = new Set<string>();

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = await req['user'];
    console.log('Middleware executado para:', req.path); //excluir

    console.log("User Id:", userId, " Token:", token); //excluir

    // if (userId && token) {
    //   if (ActivityMiddleware.usersActivity.has(userId)) {
    //     clearTimeout(ActivityMiddleware.usersActivity.get(userId));
    //   }

    //   ActivityMiddleware.usersActivity.set(
    //     userId,
    //     setTimeout(() => {
    //       console.log(`Usuário ${userId} está inativo. Deslogando...`); //excluir
    //       ActivityMiddleware.usersActivity.delete(userId);
    //       console.log("MiddleWareToken", token); //excluir
    //       // Adiciona o token à blacklist excluir
    //       ActivityMiddleware.blacklist.add(token);
    //     }, 30 * 1000),
    //   );
    // }
    next();
  }

  static isTokenBlacklisted(token: string): boolean {
    return ActivityMiddleware.blacklist.has(token);
  }
}
