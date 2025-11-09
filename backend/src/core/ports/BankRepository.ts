import { BankAccount } from "../domain/BankAccount";

export interface BankRepository {
  create(account: Omit<BankAccount, "id">): Promise<BankAccount>;
  findAllByUser(userId: number): Promise<BankAccount[]>;
  findById(id: number): Promise<BankAccount | null>;
  transfer(fromId: number, toId: number, amount: number): Promise<void>;
}
