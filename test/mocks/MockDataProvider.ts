import { faker } from "@faker-js/faker";
import IAllForce from "../../src/common/ApiTypes/IAllForces";
export abstract class MockDataProvider {
  private static _getRandomNumber(min: number, max: number): number {
    var random = Math.random();
    var scaledRandom = random * (max - min) + min;
    return scaledRandom;
  }
  public static AllForceMock(): IAllForce[] {
    const forArr: IAllForce[] = [];
    for (let i = 0; i < Math.floor(this._getRandomNumber(10, 60)); i++) {
      const singleForce = `${faker.location.county()} ${faker.company.buzzNoun()}`;
      forArr.push({
        id: singleForce.replaceAll(" ", "").toLowerCase(),
        name: singleForce,
      });
    }
    return forArr;
  }
}
