import prisma from "../../../infrastructure/db/prismaClient";
import { Route } from "../../../core/domain/Route";
import { RouteRepository } from "../../../core/ports/RouteRepository";

export class PrismaRouteRepository implements RouteRepository {
  async create(route: Omit<Route, "id">): Promise<Route> {
    const r = await prisma.route.create({ data: { ...route } as any });
    return new Route(r.id, r.name, r.fromPort, r.toPort, r.distanceNm, r.fuelType, r.emissionsCO2Ton, r.operator, r.createdAt);
  }
  async findAll(): Promise<Route[]> {
    const list = await prisma.route.findMany({ orderBy: { createdAt: "desc" } });
    return list.map(r => new Route(r.id, r.name, r.fromPort, r.toPort, r.distanceNm, r.fuelType, r.emissionsCO2Ton, r.operator, r.createdAt));
  }
  async findById(id: number): Promise<Route | null> {
    const r = await prisma.route.findUnique({ where: { id } });
    return r ? new Route(r.id, r.name, r.fromPort, r.toPort, r.distanceNm, r.fuelType, r.emissionsCO2Ton, r.operator, r.createdAt) : null;
  }
  async update(id: number, data: Partial<Route>): Promise<Route | null> {
    const r = await prisma.route.update({ where: { id }, data: data as any });
    return r ? new Route(r.id, r.name, r.fromPort, r.toPort, r.distanceNm, r.fuelType, r.emissionsCO2Ton, r.operator, r.createdAt) : null;
  }
  async delete(id: number): Promise<void> {
    await prisma.route.delete({ where: { id } });
  }
}
