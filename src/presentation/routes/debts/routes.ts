import { Router } from 'express';
import { DebtService } from '../../services/debt.service';
import { DebtsController } from './controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

export class DebtsRoutes {
  static get routes(): Router {
    const router = Router();

    const debtService = new DebtService();
    const debtsController = new DebtsController(debtService);

    router.get('/', debtsController.getDebts);
    router.get('/userDebts', [AuthMiddleware.validateJWT], debtsController.getgDebtsByUserToken);
    router.get('/:userId', debtsController.getDebtsByUserId);
    router.post('/', [AuthMiddleware.validateJWT], debtsController.createDebt);
    router.put('/:id', [AuthMiddleware.validateJWT], debtsController.updateDebt);
    router.delete('/:id', [AuthMiddleware.validateJWT], debtsController.deleteDebt);
    router.patch('/:id/pay', [AuthMiddleware.validateJWT], debtsController.markAsPaid);
    router.get('/summary/:userId', debtsController.getDebtsSummary);

    return router;
  }
}
