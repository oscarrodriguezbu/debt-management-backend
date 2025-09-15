import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserEntity } from '../domain';
import { prisma } from '../../postgres';


export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {

    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: number }>(token);
      if (!payload) return res.status(401).json({ error: 'Invalid token' })

      const user = await prisma.user.findFirst({
        where: { id: payload.id }
      });

      if (!user) return res.status(401).json({ error: 'Invalid token - user' });
      const returnedData = { ...UserEntity.fromObject(user), id: payload.id }
      req.body ? req.body.user = returnedData : (req as any).user = returnedData;

      next();

    } catch (error) {

      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
