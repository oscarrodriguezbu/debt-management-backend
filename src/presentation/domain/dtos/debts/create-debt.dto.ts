export class CreateDebtDto {
  private constructor(
    public readonly amount: number,
    public readonly description: string,
    public readonly debtorId: number,
    public readonly creditorId: number,
    public readonly isPaid: boolean = false,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateDebtDto?] {
    const { amount, description, debtorId, creditorId } = props;

    if (amount === undefined || amount === null) {
      return ['The amount field is required'];
    }
    if (typeof amount !== 'number' || isNaN(amount)) {
      return ['The amount field must be numeric'];
    }
    if (amount <= 0) {
      return ['The amount field must be greater than 0'];
    }

    if (description?.length > 300) {
      return ['The description field must not have more than 300 characters'];
    }

    if (debtorId) {
      return ['The debtorId field cannot be entered by the user'];
    }
    if (!creditorId || typeof creditorId !== 'number') {
      return ['The creditorId field is required and must be a number'];
    }

    return [
      undefined,
      new CreateDebtDto(amount, description, debtorId, creditorId),
    ];
  }
}
