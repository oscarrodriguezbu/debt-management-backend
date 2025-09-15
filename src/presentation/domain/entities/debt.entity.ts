import { User } from "../../../generated/prisma";

export class DebtEntity {
    constructor(
        public readonly id: number,
        public readonly amount: number,
        public readonly description: string,
        public readonly isPaid: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly debtor: Partial<User>,
        public readonly creditor: Partial<User>,
    ) { }

    static fromObject(obj: any): DebtEntity {
        return new DebtEntity(
            obj.id,
            obj.amount,
            obj.description,
            obj.isPaid,
            obj.createdAt,
            obj.updatedAt,
            obj.debtor,
            obj.creditor,
        );
    }
}
