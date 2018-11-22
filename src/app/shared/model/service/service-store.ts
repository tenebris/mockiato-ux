import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Service, ServiceType} from './service';
import {ServiceListService} from '../../services/core/service-list.service';


@Injectable({providedIn: 'root'})
export class ServiceStore
{
  private _services: BehaviorSubject<Array<Service>> = new BehaviorSubject([]);

  public readonly services: Observable<Array<Service>> = this._services.asObservable();


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private _backend: ServiceListService)
  {
    console.log(`constructing ServiceStore class ${this.toString()}`);
    // TODO: initialize from backend service
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

    // FIXME (otter): this doesn't work yet... need to debug
    // this._services.next(_backend.findAll());
  }


  public getService(id: string): Service
  {
    let found: Service;
    for (const service of this._services.getValue()) if (service._id === id) return service;

    // if we are here we did not find the requested service
    // go get it and put it in the store.
    found = this._backend.findService(id);
    if (found != null)
    {
      const value = this._services.getValue();
      value.push(found);
      this._services.next(value);
    }

    return found;
  }


  public publishDummyData()
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
        'type': ServiceType.MQ,
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
