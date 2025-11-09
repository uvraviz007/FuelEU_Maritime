export class Route {
  constructor(
    public id: number,
    public name: string,
    public fromPort: string,
    public toPort: string,
    public distanceNm: number,
    public fuelType: string,
    public emissionsCO2Ton: number,
    public operator: string,
    public createdAt?: Date
  ) {}
}
