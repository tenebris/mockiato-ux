import {MockDataStructure} from './mock-data-structure';
import {appLogger} from '../../app-logger';
import {SavedStructure} from './form/v1/load-saved-structure/load-saved-structure.component';
import {LogLevel} from '../logging/logging.service';


export interface MockPersonDataService
{
  prefix(): string;


  fullName(): string;


  firstName(): string;


  lastName(): string;


  gender(): string;

  /** This internal method provides consistency between the age() and birthday() results. */
  _age(): PersonAge;

  age(): number;

  birthday(): Date;

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

  public abstract supportedDataTypes: { type: string, displayValue?: string }[];

  private readonly logMsgPrefix = 'MockDataGeneratorService.buildStructure: ';


  /**
   * Generates a number of objects matching the specified structure.
   *
   * @param options.structure of data to generate
   * @param options.requested count of items to generate -- default is 10
   */
  public abstract generate(structure: MockDataStructure, itemCount?: number): any;


  public buildStructure(value: object, options: { name?: string } = {}): MockDataStructure
  {
    if (appLogger().shouldLogMessage(LogLevel.TRACE))
    {
      appLogger().trace(this.logMsgPrefix + '  building mock-data structure\n'
                        + `name=${options.name}\n${JSON.stringify(value, undefined, 4)}`);
    }

    // Save last built structure for reloading in the future...
    SavedStructure.writeLast(value);

    const structure = MockDataStructure.newMockDataStructure(options.name);
    for (const item of Object.keys(value))
    {
      const type = value[item];
      switch (typeof type)
      {
        case 'string':
          structure.addField(item, type);
          break;

        default:
          appLogger().warn(this.logMsgPrefix + `ignoring unsupported type: ${item}/${type}`);
      }
    }
    return structure;
  }
}
