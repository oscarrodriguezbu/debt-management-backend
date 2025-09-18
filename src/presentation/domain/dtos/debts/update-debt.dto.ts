export class UpdateDebtDto {
    private constructor(
        public readonly amount?: number,
        public readonly description?: string,
        public readonly isPaid?: boolean,
        public readonly updatedAt: Date = new Date(),
    ) { }

    static create(props: { [key: string]: any }): [string?, UpdateDebtDto?] {
        const { amount, description, isPaid } = props;

        if (amount !== undefined && amount <= 0) {
            return ['The amount field must be greater than 0'];
        }

        if (description.length > 300) {
            return ['The description field must not have more than 300 characters'];
        }

        return [
            undefined,
            new UpdateDebtDto(amount, description, isPaid),
        ];
    }
}
