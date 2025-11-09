import prisma from "../../../infrastructure/db/prismaClient";
import { BankAccount } from "../../../core/domain/BankAccount";
import { BankRepository } from "../../../core/ports/BankRepository";

export class PrismaBankRepository implements BankRepository {
  async create(account: Omit<BankAccount, "id">): Promise<BankAccount> {
    const a = await prisma.bankAccount.create({ data: { ...account } as any });
    return new BankAccount(a.id, a.bankName, a.encryptedAccountNumber, a.balance, a.userId, a.createdAt);
  }

  async findAllByUser(userId: number): Promise<BankAccount[]> {
    const list = await prisma.bankAccount.findMany({ where: { userId } });
    return list.map(a => new BankAccount(a.id, a.bankName, a.encryptedAccountNumber, a.balance, a.userId, a.createdAt));
  }

  async findById(id: number): Promise<BankAccount | null> {
    const a = await prisma.bankAccount.findUnique({ where: { id } });
    return a ? new BankAccount(a.id, a.bankName, a.encryptedAccountNumber, a.balance, a.userId, a.createdAt) : null;
  }

  async transfer(fromId: number, toId: number, amount: number): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const from = await tx.bankAccount.findUnique({ where: { id: fromId } });
      const to = await tx.bankAccount.findUnique({ where: { id: toId } });
      if (!from || !to) throw new Error("Account not found");
      if (from.balance < amount) throw new Error("Insufficient funds");
      await tx.bankAccount.update({ where: { id: fromId }, data: { balance: { decrement: amount } } });
      await tx.bankAccount.update({ where: { id: toId }, data: { balance: { increment: amount } } });
    });
  }
}
