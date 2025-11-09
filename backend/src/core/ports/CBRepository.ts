import { CBTransaction } from "../domain/CBTransaction";

export interface CBRepository {
  create(transaction: Omit<CBTransaction, "id">): Promise<CBTransaction>;
  findAll(): Promise<CBTransaction[]>;
  findByOperator(operator: string): Promise<CBTransaction[]>;
  getBalance(operator: string): Promise<number>;
}
