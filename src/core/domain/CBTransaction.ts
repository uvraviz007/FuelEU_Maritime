export type CBType = "credit" | "debit" | "purchase" | "sell";

export class CBTransaction {
  constructor(
    public id: number,
    public operator: string,
    public type: CBType,
    public quantity: number,
    public pricePerUnit?: number,
    public totalValue?: number,
    public createdAt?: Date
  ) {}
}
