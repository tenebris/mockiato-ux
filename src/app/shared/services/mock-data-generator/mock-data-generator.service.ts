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


export class MockDataStructure implements FlatMockDataStucture, FieldDefinition
{


  readonly name: string;
  readonly type: FieldType;
  readonly fields: FieldDefinition[];
  private readonly parent: MockDataStructure;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  private constructor(name?: string, type?: FieldType, parent?: MockDataStructure)
  {
    if (parent && type === FieldType.root) throw new Error('there can only be one root');

    this.name = name;
    this.type = type ? type : FieldType.root;
    this.parent = parent;
  }


  public static newMockDataStructure(): MockDataStructure { return new MockDataStructure(); }


  addFieldGroup(name: string): MockDataStructure
  {
    const group = new MockDataStructure(name, FieldType.group, this);
    this.fields.push(group);
    return group;
  }
}


enum FieldType
{
  root, group
}


/** simple flat data-structure for mock data */
export interface FlatMockDataStucture
{
  fields: FieldDefinition[];
}


export interface FieldDefinition
{
  name: string;
  type: FieldType;
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
