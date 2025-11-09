import { CBRepository } from "../../ports/CBRepository";

export class GetOperatorBalanceUseCase {
  constructor(private cbRepo: CBRepository) {}

  async execute(operator: string) {
    return this.cbRepo.getBalance(operator);
  }
}
