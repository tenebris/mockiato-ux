export interface MockPersonDataService
{
  prefix(): string;


  fullName(): string;


  firstName(): string;


  lastName(): string;


  gender(): string;


  age(): number;


  birthday(): Date;


  ssn(): string;


  profession(): string;
}


export interface MockLocationDataService
{
  address(): string;
  city(): string;
  state(): string;
  zipCode(): string;
  zipPlusFour(): string;
  country(): string;
}


/**
 * Provides a stable interface to the mock-data generation implementation.
 */

export abstract class MockDataGeneratorService
{
  personData: MockPersonDataService;
  locationData: MockLocationDataService;
}
