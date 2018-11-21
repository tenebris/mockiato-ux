import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Service} from './service';
import {ServiceListService} from '../services/core/service-list.service';


@Injectable()
export class ServiceStore
{
  private _services: BehaviorSubject<Array<Service>> =
    new BehaviorSubject([
      {'name': 'one'},
      {'name': 'two'},
      {'name': 'three'},
    ]);

  public readonly services: Observable<Array<Service>> = this._services.asObservable();


  constructor(private backend: ServiceListService)
  {
    // DEBT: this.loadInitialData();
  }


  public test()
  {
    // testing the dynamic update methodology
    this._services.next(
      [
        {'name': 'three'},
        {'name': 'four'},
        {'name': 'five'}
      ]);
  }

// SERVICE: add additional public functions...
}
