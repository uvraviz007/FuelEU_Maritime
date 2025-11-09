import { Router } from "express";
import { CBController } from "../controllers/CBController";
import authMiddleware from "../../../../middleware/authMiddleware";

const router = Router();
const ctrl = new CBController();

router.post("/transaction", authMiddleware, (req, res) => ctrl.createTx(req, res));
router.get("/operator/:operator", authMiddleware, (req, res) => ctrl.getBalance(req, res));
router.get("/transactions", authMiddleware, (req, res) => ctrl.createTx(req, res)); // placeholder

export default router;
