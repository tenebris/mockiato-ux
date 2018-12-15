import {Injectable} from '@angular/core';

import {
  MockDataGeneratorService,
  MockDataStructure,
  MockLocationDataService,
  MockPersonDataService,
  PersonAge
} from '../mock-data-generator.service';
import {Chance} from 'chance';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';


/**
 * Provides a mock-data generation service based on the ChanceJs library.
 *
 * @see https://chancejs.com/index.html
 */
@Injectable({providedIn: 'root'})
export class ChanceMockDataGeneratorService implements MockDataGeneratorService
{


  private readonly impl = new Impl();

  // noinspection JSUnusedGlobalSymbols -- used indirectly
  readonly personData = this.impl;

  // noinspection JSUnusedGlobalSymbols -- used indirectly
  readonly locationData = this.impl;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private datePipe: DatePipe) {}


  generate(structure: MockDataStructure, requested?: number): any
  {
    const count = requested || 10;
    const results = [];

    for (let i = count; i > 0; i--)
    {
      // TODO: pay attention to the requested data-type

      const personAge = this.personData.age();

      results.push({
        name: this.personData.fullName(),
        age: personAge.years,
        birthday: this.datePipe.transform(personAge.birthday, 'yyyy-MM-dd'),
        address: this.locationData.address(),
        state: this.locationData.state(),
        zip: this.locationData.zipCode(),
      });
    }

    return results;
  }

}


class Impl implements MockPersonDataService, MockLocationDataService
{

  private readonly chance: Chance.Chance;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { this.chance = Chance(); }


  firstName(): string { return this.chance.first(); }


  /** Generates a full name with a chance of getting a middle-name (25%) and/or suffix (10%) */
  fullName(): string
  {
    // TODO: add a weighted chance of getting names from other nationalities
    const chance = this.chance;
    return chance.name({
      middle: chance.bool({likelihood: 25}),
      suffix: chance.bool({likelihood: 10}),
    });
  }


  gender(): string { return this.chance.gender(); }


  age(): PersonAge
  {
    const _when = moment(this.chance.birthday()).startOf('day');
    const _age = moment().diff(_when, 'years');
    const _birthday = _when.toDate();

    return {
      years: _age,
      birthday: _birthday,
    };
  }


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

