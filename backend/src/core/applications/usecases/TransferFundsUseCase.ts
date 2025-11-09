import { BankRepository } from "../../ports/BankRepository";

export class TransferFundsUseCase {
  constructor(private bankRepo: BankRepository) {}

  async execute(fromId: number, toId: number, amount: number) {
    if (amount <= 0) throw new Error("Invalid amount");
    await this.bankRepo.transfer(fromId, toId, amount);
  }
}
