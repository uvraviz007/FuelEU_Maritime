import { RouteRepository } from "../../ports/RouteRepository";

export class GetAllRoutesUseCase {
  constructor(private routeRepo: RouteRepository) {}

  async execute() {
    return this.routeRepo.findAll();
  }
}
