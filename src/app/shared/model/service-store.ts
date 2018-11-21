import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Service, ServiceType} from './service';
import {ServiceListService} from '../services/core/service-list.service';


@Injectable()
export class ServiceStore
{
  // noinspection SpellCheckingInspection
  private _services: BehaviorSubject<Array<Service>> =
    new BehaviorSubject([
      {
        '_id': '1',
        'name': 'upm4:resource-clm-chwy-pharmacyclaims-v1',
        'type': ServiceType.REST,
        'owner': 'otter',
        lastModified: {
          'user': 'otter',
          'timestamp': new Date(Date.now()),
        }
      },
      {
        '_id': '3',
        'name': 'upm4:dataservice-cams-myuhcreceiverservice-v9',
        'type': ServiceType.SOAP,
        'owner': 'otter',
        lastModified: {
          'user': 'otter',
          'timestamp': new Date(Date.parse('12/01/2017')),
        }
      }
    ]);

  public readonly services: Observable<Array<Service>> = this._services.asObservable();


  constructor(private backend: ServiceListService)
  {
    // DEBT: this.loadInitialData();
  }


  public test()
  {
    // testing the dynamic update methodology
    // noinspection SpellCheckingInspection
    this._services.next([
      {
        '_id': '1',
        'name': 'upm4:resource-clm-chwy-pharmacyclaims-v1',
        'type': ServiceType.REST,
        'owner': 'otter',
        lastModified: {
          'user': 'otter',
          'timestamp': new Date(Date.now()),
        }
      },
      {
        '_id': '2',
        'name': 'two',
        'owner': 'fred',
        'type': ServiceType.REST,
      },
      {
        '_id': '3',
        'name': 'upm4:dataservice-cams-myuhcreceiverservice-v9',
        'type': ServiceType.SOAP,
        'owner': 'otter',
        lastModified: {
          'user': 'george',
          'timestamp': new Date(Date.parse('12/01/2017')),
        }
      },
      {
        '_id': '4',
        'name': 'four',
        'owner': 'george',
        'type': ServiceType.REST,
      }
    ]);
  }

// SERVICE: add additional public functions...
}
