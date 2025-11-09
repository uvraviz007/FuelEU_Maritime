import { Request, Response } from "express";
import { PrismaRouteRepository } from "../../../outbound/postgres/PrismaRouteRepository";
import { CreateRouteUseCase } from "../../../../core/application/usecases/CreateRouteUseCase";
import { GetAllRoutesUseCase } from "../../../../core/application/usecases/GetAllRoutesUseCase";

const routeRepo = new PrismaRouteRepository();
const createRouteUC = new CreateRouteUseCase(routeRepo);
const getAllRoutesUC = new GetAllRoutesUseCase(routeRepo);

export class RouteController {
  async create(req: Request, res: Response) {
    try {
      const route = await createRouteUC.execute(req.body);
      res.status(201).json(route);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const list = await getAllRoutesUC.execute();
      res.json(list);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
