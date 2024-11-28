import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
  private static usersActivity = new Map<string, NodeJS.Timeout>();
  private static blacklist = new Set<string>();

  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.user?.id;

    if (userId && token) {
      if (ActivityMiddleware.usersActivity.has(userId)) {
        clearTimeout(ActivityMiddleware.usersActivity.get(userId));
      }

      ActivityMiddleware.usersActivity.set(
        userId,
        setTimeout(() => {
          console.log(`Usuário ${userId} está inativo. Deslogando...`);
          ActivityMiddleware.usersActivity.delete(userId);
          console.log("MiddleWareToken", token);
          // Adiciona o token à blacklist
          ActivityMiddleware.blacklist.add(token);
        }, 1 * 60 * 1000),
      );
    }
    next();
  }

  static isTokenBlacklisted(token: string): boolean {
    return ActivityMiddleware.blacklist.has(token);
  }
}
