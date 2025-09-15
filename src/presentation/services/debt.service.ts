import { PrismaClient } from '../../generated/prisma';
import { CreateDebtDto, CustomError, DebtEntity, UpdateDebtDto } from '../domain';

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
        });

        return debts.map(DebtEntity.fromObject);
    }

    async getByUserId(userId: number): Promise<DebtEntity[]> {
        const debts = await prisma.debt.findMany({
            where: { OR: [{ debtorId: userId }, { creditorId: userId }] },
            include: this.userInclude,
        });

        return debts.map(DebtEntity.fromObject);
    }

    async create(dto: CreateDebtDto): Promise<DebtEntity> {
        const debt = await prisma.debt.create({
            data: { ...dto },
            include: this.userInclude,
        });
        return DebtEntity.fromObject(debt);
    }

    async update(id: number, dto: UpdateDebtDto): Promise<DebtEntity> {
        const debt = await prisma.debt.findUnique({ where: { id } });
        if (!debt) throw CustomError.badRequest('Debt not found');
        if (debt.isPaid) throw CustomError.badRequest('Cannot update a paid debt');

        const updated = await prisma.debt.update({
            where: { id },
            data: { ...dto, updatedAt: new Date() },
            include: this.userInclude,
        });

        return DebtEntity.fromObject(updated);
    }

    async markAsPaid(id: number): Promise<DebtEntity> {
        const debt = await prisma.debt.findUnique({ where: { id } });
        if (!debt) throw CustomError.badRequest('Debt not found');
        if (debt.isPaid) throw CustomError.badRequest('Debt is already paid');

        const updated = await prisma.debt.update({
            where: { id },
            data: { isPaid: true, updatedAt: new Date() },
            include: this.userInclude,
        });

        return DebtEntity.fromObject(updated);
    }

    async delete(id: number): Promise<void> {
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
