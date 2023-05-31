import { faker } from "@faker-js/faker";
import IAllForce from "../../src/common/ApiTypes/IAllForces";
import IOfficerBio from "../../src/common/ApiTypes/IOfficerBio";
import ICrimeReport from "../../src/common/ApiTypes/ICrimeReport";
import IPoliceService from "../../src/common/ApiTypes/IPoliceService";
import ICrimeStreetDates from "../../src/common/ApiTypes/ICrimeStreetDates";
import { AxiosError, AxiosResponse } from "axios";
export abstract class MockDataProvider {
  public static ExampleAxiosError = {
    config: {},
    request: {},
    message: "Axios error.",
    response: {
      data: "",
      status: 500,
    } as AxiosResponse,
  } as AxiosError;
  private static _getRandomNumber(min: number, max: number): number {
    const random = Math.random();
    return random * (max - min) + min;
  }
  public static async SingleForceMock(): Promise<IAllForce> {
    const singleForce = `${faker.location.county()} ${faker.company.buzzNoun()}`;
    return {
      id: singleForce.replaceAll(" ", "").toLowerCase(),
      name: singleForce,
    };
  }
  public static async AllForceMock(): Promise<IAllForce[]> {
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
  public static async OfficerBioMock(): Promise<IOfficerBio[]> {
    const forArr: IOfficerBio[] = [];
    for (let i = 0; i < Math.floor(this._getRandomNumber(10, 60)); i++) {
      forArr.push({
        bio: faker.person.bio(),
        name: faker.person.fullName(),
        rank: faker.person.jobTitle(),
      });
    }
    return forArr;
  }
  public static async CrimeReportMock(): Promise<ICrimeReport[]> {
    const reportArr: ICrimeReport[] = [];
    for (let i = 0; i < Math.floor(this._getRandomNumber(10, 60)); i++) {
      const crimeReport: ICrimeReport = {
        category: faker.word.noun(),
        location_type: Math.random() < 0.5 ? null : faker.random.word(),
        location: Math.random() < 0.5 ? null : faker.address.streetAddress(),
        context: faker.lorem.sentence(),
        outcome_status:
          Math.random() < 0.5
            ? null
            : {
                category: faker.random.word(),
                date: faker.date.past().toISOString(),
              },
        persistent_id: faker.string.uuid(),
        id: faker.number.int(),
        location_subtype: faker.person.zodiacSign(),
        month: faker.date.past().toISOString(),
      };
      reportArr.push(crimeReport);
    }
    return reportArr;
  }
  public static async PoliceServiceMock(
    force: IAllForce
  ): Promise<IPoliceService> {
    const policeService: IPoliceService = {
      description: faker.lorem.sentence(),
      url: faker.internet.url(),
      engagement_methods: [],
      telephone: faker.phone.number(),
      id: force.id,
      name: force.name,
    };

    const numEngagementMethods = Math.floor(this._getRandomNumber(1, 5));
    for (let j = 0; j < numEngagementMethods; j++) {
      const engagementMethod = {
        url: faker.internet.url(),
        description: faker.lorem.sentence(),
        title: faker.word.noun(),
        type: faker.word.noun(),
      };
      policeService.engagement_methods.push(engagementMethod);
    }
    return policeService;
  }
  public static async StopSearchAvailabilityMock(): Promise<
    ICrimeStreetDates[]
  > {
    const arr: ICrimeStreetDates[] = [];
    for (let i = 0; i < faker.number.int({ min: 4, max: 20 }); i++) {
      arr.push({
        "stop-and-search": [""],
        date: faker.date.anytime().toISOString(),
      });
    }
    return arr;
  }
}
