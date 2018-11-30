import {Injectable} from '@angular/core';
import {Chance} from 'chance';


@Injectable({providedIn: 'root'})
export class MockDataGeneratorService
{

  private readonly chance: Chance.Chance;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor() { this.chance = Chance(); }


  public address(): string { return this.chance.address(); }


  public fullName(): string { return this.chance.name(); }


  public state(): string { return this.chance.state(); }


  public zipCode(): string { return this.chance.zip(); }
}
