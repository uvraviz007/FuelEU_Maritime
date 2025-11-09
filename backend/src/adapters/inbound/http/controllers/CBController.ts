import { Request, Response } from "express";
import { PrismaCBRepository } from "../../../outbound/postgres/PrismaCBRepository";
import { CreateCBTransactionUseCase } from "../../../../core/application/usecases/CreateCBTransactionUseCase";
import { GetOperatorBalanceUseCase } from "../../../../core/application/usecases/GetOperatorBalanceUseCase";

const cbRepo = new PrismaCBRepository();
const createCbUC = new CreateCBTransactionUseCase(cbRepo);
const getBalanceUC = new GetOperatorBalanceUseCase(cbRepo);

export class CBController {
  async createTx(req: Request, res: Response) {
    try {
      const data = req.body;
      const tx = await createCbUC.execute(data);
      res.status(201).json(tx);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getBalance(req: Request, res: Response) {
    try {
      const operator = req.params.operator;
      const balance = await getBalanceUC.execute(operator);
      res.json({ operator, balance });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
