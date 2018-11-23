import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Service, ServiceType} from './service';
import {ServiceListService} from '../../services/core/service-list.service';
import {appLogger} from '../../app-logger';


@Injectable({providedIn: 'root'})
export class ServiceStore
{
  private _services: BehaviorSubject<Array<Service>> = new BehaviorSubject([]);

  public readonly services: Observable<Array<Service>> = this._services.asObservable();


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private _backend: ServiceListService)
  {
    appLogger().trace('constructing ServiceStore class');
    // TODO: initialize from backend service
    this._services.next([
      {
        '_id': '1',
        'name': 'upm4:resource-clm-chwy-pharmacyclaims-v1',
        'type': ServiceType.REST,
        'basePath': '/MockiatoUx/v1/api',
        'group': {'name': 'Unit'},
        'owner': 'otter',
        'lastModified': {
          'user': 'otter',
          'timestamp': new Date(Date.now()),
        }
      },
      {
        '_id': '3',
        'name': 'upm4:dataservice-cams-myuhcreceiverservice-v9',
        'type': ServiceType.SOAP,
        'basePath': '/cams/myuhcreceiverservice/v9',
        'group': {'name': 'Regression'},
        'owner': 'otter',
        'lastModified': {
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
        'basePath': '/MockiatoUx/v1/api',
        'group': {'name': 'Unit'},
        'owner': 'otter',
        'lastModified': {
          'user': 'otter',
          'timestamp': new Date(Date.now()),
        }
      },
      {
        '_id': '2',
        'name': 'two',
        'owner': 'fred',
        'type': ServiceType.MQ,
        'basePath': '/',
        'group': {'name': 'Sandbox'},
        'lastModified': {
          'user': 'george',
          'timestamp': new Date(Date.parse('12/01/2017')),
        }
      },
      {
        '_id': '3',
        'name': 'upm4:dataservice-cams-myuhcreceiverservice-v9',
        'type': ServiceType.SOAP,
        'basePath': '/cams/myuhcreceiverservice/v9',
        'group': {'name': 'Regression'},
        'owner': 'otter',
        'lastModified': {
          'user': 'fred',
          'timestamp': new Date(Date.parse('08/01/2014')),
        }
      },
      {
        '_id': '4',
        'name': 'four',
        'basePath': '/',
        'type': ServiceType.SOAP,
        'group': {'name': 'Unit'},
        'owner': 'george',
      }
    ]);
  }


// SERVICE: add additional public functions...
}
