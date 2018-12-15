import {Injectable} from '@angular/core';

import {MockDataGeneratorService, MockPersonDataService} from '../mock-data-generator.service';
import {Chance} from 'chance';


@Injectable({providedIn: 'root'})
export class ChanceMockDataGeneratorService implements MockDataGeneratorService
{

  private impl = new Impl();

  readonly personData = this.impl;

}


class Impl implements MockPersonDataService
{

  private readonly chance: Chance.Chance;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { this.chance = Chance(); }


  age(): number { return this.chance.age(); }


  birthday(): Date { return this.chance.birthday(); }


  firstName(): string { return this.chance.first(); }


  fullName(): string { return this.chance.name(); }


  gender(): string { return this.chance.gender(); }


  lastName(): string { return this.chance.last(); }


  prefix(): string { return this.chance.prefix(); }


  profession(): string { return this.chance.profession(); }


  ssn(): string { return this.chance.ssn(); }

}

