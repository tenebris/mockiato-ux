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


/**
 * Provides a stable interface to the mock-data generation implementation.
 */

export abstract class MockDataGeneratorService
{
  personData: MockPersonDataService;
}


enum __PersonDataTypes
{
  _prefix,
  _fullName,
  _firstName,
  _lastName,
  _gender,
  _age,
  _ssn,
  _profession,
}


