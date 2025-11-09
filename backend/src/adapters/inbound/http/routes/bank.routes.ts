import { Router } from "express";
import { BankController } from "../controllers/BankController";
import authMiddleware from "../../../../middleware/authMiddleware";

const router = Router();
const ctrl = new BankController();

router.post("/account", authMiddleware, (req, res) => ctrl.createAccount(req, res));
router.get("/accounts", authMiddleware, (req, res) => ctrl.getAccounts(req, res));
router.post("/transfer", authMiddleware, (req, res) => ctrl.transfer(req, res));

export default router;
