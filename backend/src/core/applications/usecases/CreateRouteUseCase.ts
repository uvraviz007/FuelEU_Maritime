import { RouteRepository } from "../../ports/RouteRepository";
import { Route } from "../../domain/Route";

export class CreateRouteUseCase {
  constructor(private routeRepo: RouteRepository) {}

  async execute(data: Omit<Route, "id">) {
    return this.routeRepo.create(data);
  }
}
