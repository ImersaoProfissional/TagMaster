import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
  private static lastActivity: Map<string, number> = new Map();
  private static tokenExpiry: Map<string, number> = new Map(); // Armazenando expiração do token

  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log("ENTREI NO MIDDLEWARE");

    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do header
    if (!token) {
      return next(); // Pule se não houver token
    }

    try {
      const payload = this.jwtService.verify(token, { ignoreExpiration: true }); // Verifica o token sem considerar a expiração do JWT
      const userId = payload?.sub;

      if (!userId) {
        throw new UnauthorizedException('Token inválido');
      }

      const now = Date.now();
      const lastActivity = ActivityMiddleware.lastActivity.get(userId);
      const tokenExpiry = ActivityMiddleware.tokenExpiry.get(userId);

      if (tokenExpiry && now > tokenExpiry) {
        // Caso o token tenha expirado devido à inatividade
        ActivityMiddleware.lastActivity.delete(userId); // Limpa atividade para esse usuário
        ActivityMiddleware.tokenExpiry.delete(userId); // Limpa o tempo de expiração
        throw new UnauthorizedException('Sessão expirada por inatividade');
      }

      if (lastActivity && now - lastActivity > 30 * 60 * 1000) { // 30 minutos
        // Sessão expirada por inatividade
        ActivityMiddleware.lastActivity.delete(userId);
        ActivityMiddleware.tokenExpiry.delete(userId);
        throw new UnauthorizedException('Sessão expirada por inatividade');
      }

      // Atualize a última atividade
      ActivityMiddleware.lastActivity.set(userId, now);

      // Atualize a expiração do token para 1 dia (em milissegundos)
      ActivityMiddleware.tokenExpiry.set(userId, now + 24 * 60 * 60 * 1000);

      next();
    } catch (error) {
      // Permite que o login seja executado, mesmo se o token expirar
      if (req.path === '/auth/login') {
        return next();
      }

      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
