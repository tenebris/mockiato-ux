import {Injectable} from '@angular/core';

import {MockDataGeneratorService, MockLocationDataService, MockPersonDataService, PersonAge} from '../mock-data-generator.service';
import {Chance} from 'chance';
import * as moment from 'moment';


/**
 * Provides a mock-data generation service based on the ChanceJs library.
 *
 * @see https://chancejs.com/index.html
 */
@Injectable({providedIn: 'root'})
export class ChanceMockDataGeneratorService implements MockDataGeneratorService
{

  private impl = new Impl();

  readonly personData = this.impl;
  readonly locationData = this.impl;

}


class Impl implements MockPersonDataService, MockLocationDataService
{

  private readonly chance: Chance.Chance;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { this.chance = Chance(); }


  firstName(): string { return this.chance.first(); }


  /** Generates a full name with a chance of getting a middle-name and/or suffix */
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
    const _age = moment().diff(_when, 'years')
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


  zipCode(): string { return this.chance.zip(); }


  zipPlusFour(): string { return this.chance.zip({plusfour: true}); }

}

