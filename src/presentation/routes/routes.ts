import { Router } from 'express';
import { DebtsRoutes } from './debts/routes';
import { Authroutes } from './auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/auth', Authroutes.routes );
    router.use('/api/debts', DebtsRoutes.routes);
    return router;
  }
}