import { Router } from 'express';
import { DebtService } from '../../services/debt.service';
import { DebtsController } from './controller';

export class DebtsRoutes {
  static get routes(): Router {
    const router = Router();

    const debtService = new DebtService();
    const debtsController = new DebtsController(debtService);

    router.get('/', debtsController.getDebts);
    router.get('/:userId', debtsController.getDebtsByUserId);
    router.post('/', debtsController.createDebt);
    router.put('/:id', debtsController.updateDebt);
    router.delete('/:id', debtsController.deleteDebt);

    router.patch('/:id/pay', debtsController.markAsPaid);
    router.get('/summary/:userId', debtsController.getDebtsSummary);

    return router;
  }
}
