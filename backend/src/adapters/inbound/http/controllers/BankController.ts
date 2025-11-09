import { Request, Response, NextFunction } from "express";
import { PrismaBankRepository } from "../../../outbound/postgres/PrismaBankRepository";
import { CreateBankAccountUseCase } from "../../../../core/applications/usecases/CreateBankAccountUseCase";
import { TransferFundsUseCase } from "../../../../core/applications/usecases/TransferFundsUseCase";

const bankRepo = new PrismaBankRepository();
const createAccUC = new CreateBankAccountUseCase(bankRepo);
const transferUC = new TransferFundsUseCase(bankRepo);

export class BankController {
  async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { bankName, accountNumber, initialBalance } = req.body;
      const userId = Number((req as any).user?.id);
      if (!Number.isFinite(userId) || userId <= 0) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const acc = await createAccUC.execute({
        bankName,
        accountNumber,
        userId,
        initialBalance: initialBalance ? Number(initialBalance) : 0,
      });

      // sanitize response (don't leak encryptedAccountNumber)
      const out = {
        id: acc.id,
        bankName: acc.bankName,
        balance: acc.balance,
        createdAt: acc.createdAt,
        accountNumberMasked: "****",
      };

      res.status(201).json(out);
    } catch (err: any) {
      next(err);
    }
  }

  async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number((req as any).user?.id);
      if (!Number.isFinite(userId) || userId <= 0) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const list = await bankRepo.findAllByUser(userId);
      const masked = list.map(a => ({
        id: a.id,
        bankName: a.bankName,
        balance: a.balance,
        accountNumberMasked: "****"
      }));
      res.json(masked);
    } catch (err: any) {
      next(err);
    }
  }

  async transfer(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromId, toId, amount } = req.body;
      await transferUC.execute(Number(fromId), Number(toId), Number(amount));
      res.json({ success: true });
    } catch (err: any) {
      next(err);
    }
  }
}