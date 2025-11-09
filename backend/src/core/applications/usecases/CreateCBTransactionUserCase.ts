import { CBRepository } from "../../ports/CBRepository";
import { CBTransaction } from "../../domain/CBTransaction";

export class CreateCBTransactionUseCase {
  constructor(private cbRepo: CBRepository) {}

  async execute(data: Omit<CBTransaction, "id" | "totalValue">) {
    const totalValue = (data.pricePerUnit ?? 0) * data.quantity;
    return this.cbRepo.create({ ...data, totalValue });
  }
}
