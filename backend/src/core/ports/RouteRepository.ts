import { Route } from "../domain/Route";

export interface RouteRepository {
  create(route: Omit<Route, "id">): Promise<Route>;
  findAll(): Promise<Route[]>;
  findById(id: number): Promise<Route | null>;
  update(id: number, data: Partial<Route>): Promise<Route | null>;
  delete(id: number): Promise<void>;
}
