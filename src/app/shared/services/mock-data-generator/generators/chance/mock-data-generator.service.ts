import {Injectable} from '@angular/core';

import {MockDataGeneratorService, MockLocationDataService, MockPersonDataService, PersonAge} from '../../mock-data-generator.service';
import {Chance} from 'chance';
import * as moment from 'moment';
import {MockDataStructure} from '../../mock-data-structure';
import {appLogger} from '../../../../app-logger';
import {LogLevel} from '../../../logging/logging.service';


/**
 * Provides a mock-data generation service based on the ChanceJs library.
 *
 * @see https://chancejs.com/index.html
 */
@Injectable({providedIn: 'root'})
export class ChanceMockDataGeneratorService extends MockDataGeneratorService
{


  public readonly supportedDataTypes: { type: string; displayValue?: string }[];

  private readonly impl = new Impl();


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor()
  {
    super();

    for (const type of Object.keys(this.impl))
    {
      appLogger().debug('found type: ' + type);
    }

    this.supportedDataTypes = Object.getOwnPropertyNames(Impl.prototype)
      .filter(x => 'constructor' !== x) // ignore the constructor reference
      .filter(x => !x.startsWith('_'))  // any any that are designated as internal
      .map(x => ({type: x, displayValue: x}));

    // only bother stringify'ng this if it will be logged...
    if (appLogger().shouldLogMessage(LogLevel.TRACE))
    {
      appLogger().trace(
        'initialized ChanceMockDataGeneratorService with supported types: '
        + JSON.stringify(this.supportedDataTypes));
    }
  }


  generate(structure: MockDataStructure, itemCount?: number): any
  {
    const count = itemCount || 10;
    const results = [];

    // generate the expected number of instances of the given structure...
    for (let i = count; i > 0; i--) results.push(structure.generate(this.impl));

    return results;
  }

}


class Impl implements MockPersonDataService, MockLocationDataService
{

  private readonly chance: Chance.Chance;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { this.chance = Chance(); }


  _age(): PersonAge
  {
    const _when = moment(this.chance.birthday()).startOf('day');
    const _age = moment().diff(_when, 'years');
    const _birthday = _when.toDate();

    return {
      years: _age,
      birthday: _birthday,
    };
  }


  birthday(age?: PersonAge): Date
  {
    if (age) return age.birthday;
    else return this._age().birthday;
  }


  age(age?: PersonAge): number
  {
    if (age) return age.years;
    else return this._age().years;
  }


  firstName(): string { return this.chance.first(); }


  /** Generates a full name with a chance of getting a middle-name (25%) and/or suffix (10%) */
  fullName(): string
  {
    const chance = this.chance;

    // selects a nationality for the name using a weighted list
    const nation = chance.weighted(['en', 'it'], [50, 1]);

    return chance.name({
      middle: chance.bool({likelihood: 25}),
      suffix: chance.bool({likelihood: 10}),
      nationality: nation,
    });
  }


  gender(): string { return this.chance.gender(); }


  lastName(): string { return this.chance.last(); }


  prefix(): string { return this.chance.prefix(); }


  profession(): string { return this.chance.profession(); }


  ssn(): string { return this.chance.ssn(); }


  address(): string { return this.chance.address(); }


  city(): string { return this.chance.city(); }


  country(): string { return this.chance.country(); }


  state(): string { return this.chance.state(); }


  /** returns a zip+4 in 30% of the calls */
  zipCode(): string
  {
    const chance = this.chance;
    return chance.zip({plusfour: chance.bool({likelihood: 30})});
  }


  /** always returns a zip+4 */
  zipPlusFour(): string
  { return this.chance.zip({plusfour: true}); }

}

