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

        if (description?.length > 300) {
            return ['The description field must not have more than 300 characters'];
        }

        if (description && description.trim().length === 0) {
            return ['The description field cannot consist only of spaces or line breaks.'];
        }

        return [
            undefined,
            new UpdateDebtDto(amount, description, isPaid),
        ];
    }
}
