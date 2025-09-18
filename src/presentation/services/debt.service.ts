import { PrismaClient } from '../../generated/prisma';
import { CreateDebtDto, CustomError, DebtEntity, UpdateDebtDto, UserEntity } from '../domain';

const prisma = new PrismaClient();

export class DebtService {
    private readonly userInclude = {
        debtor: {
            select: {
                name: true,
                email: true,
            },
        },
        creditor: {
            select: {
                name: true,
                email: true,
            },
        },
    };

    async getAll(): Promise<DebtEntity[]> {
        const debts = await prisma.debt.findMany({
            include: this.userInclude,
            orderBy: { updatedAt: 'desc' },
        });

        return debts.map(DebtEntity.fromObject);
    }

    async getAllDebtsByUserToken(isPaid: boolean, user: UserEntity): Promise<DebtEntity[]> {
        const debts = await prisma.debt.findMany({
            where: { OR: [{ debtorId: Number(user.id), isPaid }] },
            include: this.userInclude,
            orderBy: { updatedAt: 'desc' },
        });

        return debts.map(DebtEntity.fromObject);
    }

    async getByUserId(userId: number): Promise<DebtEntity[]> {
        const debts = await prisma.debt.findMany({
            where: { OR: [{ debtorId: userId }, { creditorId: userId }] },
            include: this.userInclude,
            orderBy: { updatedAt: 'desc' },
        });

        return debts.map(DebtEntity.fromObject);
    }

    async create(dto: CreateDebtDto, user: UserEntity): Promise<DebtEntity> {
        const debtorId = Number(user.id);
        if (debtorId === dto.creditorId) throw CustomError.badRequest('The debtor and the creditor cannot be the same person');

        const debt = await prisma.debt.create({
            data: { ...dto, debtorId },
            include: this.userInclude,
        });
        return DebtEntity.fromObject(debt);
    }

    async update(id: number, dto: UpdateDebtDto, user: UserEntity): Promise<DebtEntity> {
        const debt = await prisma.debt.findUnique({ where: { id } });
        if (!debt) throw CustomError.badRequest('Debt not found');
        if (debt.isPaid) throw CustomError.badRequest('Cannot update a paid debt');
        if (debt.debtorId !== user.id) throw CustomError.badRequest("You cannot update another user's debts");

        const updated = await prisma.debt.update({
            where: { id },
            data: { ...dto, updatedAt: new Date() },
            include: this.userInclude,
        });

        return DebtEntity.fromObject(updated);
    }

    async markAsPaid(id: number, user: UserEntity): Promise<DebtEntity> {
        const debt = await prisma.debt.findUnique({ where: { id } });
        if (!debt) throw CustomError.badRequest('Debt not found');
        if (debt.isPaid) throw CustomError.badRequest('Debt is already paid');
        if (debt.debtorId !== user.id) throw CustomError.badRequest("You cannot update another user's debts");

        const updated = await prisma.debt.update({
            where: { id },
            data: { isPaid: true, updatedAt: new Date() },
            include: this.userInclude,
        });

        return DebtEntity.fromObject(updated);
    }

    async delete(id: number, user: UserEntity): Promise<void> {
        const debt = await prisma.debt.findUnique({ where: { id } });
        if (!debt) throw CustomError.badRequest('Debt not found');
        if (debt.debtorId !== user.id) throw CustomError.badRequest("You cannot delete another user's debts");

        await prisma.debt.delete({ where: { id } });
    }

    async getSummary(userId: number) {
        const debts = await prisma.debt.findMany({
            where: {
                OR: [{ debtorId: userId }, { creditorId: userId }],
            },
        });

        const totalOwedPaid = debts
            .filter((d) => d.debtorId === userId && d.isPaid)
            .reduce((acc, d) => acc + d.amount, 0);

        const totalOwedPending = debts
            .filter((d) => d.debtorId === userId && !d.isPaid)
            .reduce((acc, d) => acc + d.amount, 0);

        const totalReceivablePaid = debts
            .filter((d) => d.creditorId === userId && d.isPaid)
            .reduce((acc, d) => acc + d.amount, 0);

        const totalReceivablePending = debts
            .filter((d) => d.creditorId === userId && !d.isPaid)
            .reduce((acc, d) => acc + d.amount, 0);

        return {
            owed: {
                paid: totalOwedPaid,
                pending: totalOwedPending,
            },
            receivable: {
                paid: totalReceivablePaid,
                pending: totalReceivablePending,
            },
        };
    }

}
