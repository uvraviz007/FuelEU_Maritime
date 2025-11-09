import { Router } from "express";
import { RouteController } from "../controllers/RouteController";
import authMiddleware from "../../../../middleware/authMiddleware";

const router = Router();
const ctrl = new RouteController();

router.post("/", authMiddleware, (req, res) => ctrl.create(req, res));
router.get("/", authMiddleware, (req, res) => ctrl.list(req, res));

export default router;
