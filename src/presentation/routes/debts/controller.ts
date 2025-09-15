import { Request, Response } from 'express';
import { DebtService } from '../../services/debt.service';
import { CustomError, CreateDebtDto, UpdateDebtDto } from '../../domain';

export class DebtsController {
  constructor(private readonly debtService: DebtService) { }

  getDebts = async (req: Request, res: Response) => {
    this.debtService.getAll()
      .then((debts) => res.json(debts))
      .catch(error => CustomError.handleError(error, res));
  };

  getDebtsByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    this.debtService.getByUserId(Number(userId))
      .then((debts) => res.json(debts))
      .catch(error => CustomError.handleError(error, res));
  };

  createDebt = async (req: Request, res: Response) => {
    const [error, dto] = CreateDebtDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.debtService.create(dto!)
      .then((debt) => res.status(201).json(debt))
      .catch(error => CustomError.handleError(error, res));
  };

  updateDebt = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateDebtDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.debtService.update(Number(id), dto!)
      .then((debt) => res.status(201).json(debt))
      .catch(error => CustomError.handleError(error, res));
  };

  deleteDebt = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.debtService.delete(Number(id))
      .then((debt) => res.status(204).send())
      .catch(error => CustomError.handleError(error, res));
  };

  markAsPaid = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.debtService.markAsPaid(Number(id))
      .then((debt) => res.status(201).json(debt))
      .catch(error => CustomError.handleError(error, res));
  };

  getDebtsSummary = async (req: Request, res: Response) => {
    const { userId } = req.params;
    this.debtService.getSummary(Number(userId))
      .then((summary) => res.status(201).json(summary))
      .catch(error => CustomError.handleError(error, res));
  };
}
