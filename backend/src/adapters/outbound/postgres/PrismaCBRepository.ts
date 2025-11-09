import prisma from "../../../infrastructure/db/prismaClient";
import { CBTransaction } from "../../../core/domain/CBTransaction";
import { CBRepository } from "../../../core/ports/CBRepository";

export class PrismaCBRepository implements CBRepository {
  async create(transaction: Omit<CBTransaction, "id">): Promise<CBTransaction> {
    const t = await prisma.cBTransaction.create({ data: { ...transaction } as any });
    return new CBTransaction(t.id, t.operator, t.type as any, t.quantity, t.pricePerUnit ?? undefined, t.totalValue ?? undefined, t.createdAt);
  }
  async findAll(): Promise<CBTransaction[]> {
    const list = await prisma.cBTransaction.findMany({ orderBy: { createdAt: "desc" } });
    return list.map(t => new CBTransaction(t.id, t.operator, t.type as any, t.quantity, t.pricePerUnit ?? undefined, t.totalValue ?? undefined, t.createdAt));
  }
  async findByOperator(operator: string): Promise<CBTransaction[]> {
    const list = await prisma.cBTransaction.findMany({ where: { operator }, orderBy: { createdAt: "desc" } });
    return list.map(t => new CBTransaction(t.id, t.operator, t.type as any, t.quantity, t.pricePerUnit ?? undefined, t.totalValue ?? undefined, t.createdAt));
  }
  async getBalance(operator: string): Promise<number> {
    const credits = await prisma.cBTransaction.aggregate({
      _sum: { quantity: true },
      where: { operator, type: { in: ["credit", "purchase"] } }
    });
    const debits = await prisma.cBTransaction.aggregate({
      _sum: { quantity: true },
      where: { operator, type: { in: ["debit", "sell"] } }
    });
    const creditSum = credits._sum.quantity ?? 0;
    const debitSum = debits._sum.quantity ?? 0;
    return creditSum - debitSum;
  }
}



