import {MockDataStructure} from './mock-data-structure';


export interface MockPersonDataService
{
  prefix(): string;


  fullName(): string;


  firstName(): string;


  lastName(): string;


  gender(): string;


  age(): PersonAge;


  ssn(): string;


  profession(): string;
}


export interface PersonAge
{
  years: number;

  birthday: Date;
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


  /**
   * Generates a number of objects matching the specified structure.
   *
   * @param structure of data to generate
   * @param requested count of items to generate -- default is 10
   */
  public abstract generate(structure: MockDataStructure, requested?: number): any;
}
