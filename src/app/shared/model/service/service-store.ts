import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Chance} from 'chance';

import * as moment from 'moment';

import {Service, ServiceType} from './service';
import {ServiceListService} from '../../services/core/service-list/service-list.service';
import {appLogger} from '../../app-logger';
import {Group} from '../group/group';
import {LastModifiedDetail} from '../common/last-modified-detail';
import {MockiatoUser} from '../mockiato-user';


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
        'owner': {name: 'otter'},
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
        'owner': {name: 'otter'},
        'lastModified': {
          'user': 'otter',
          'timestamp': new Date(Date.parse('12/01/2017')),
        }
      }
    ]);

    // FIXME (otter): this doesn't work yet... need to debug
    // this._services.next(_backend.findAll());
  }


  public async getService(id: string): Promise<Service>
  {
    appLogger().trace('checking cache for service:' + id);
    for (const service of this._services.getValue()) if (service._id === id) return service;

    // if we are here we did not find the requested service
    // go get it and put it in the store.
    appLogger().trace('cache miss for service:' + id);
    return this._backend.findService(id);
  }


  public getCurrentServiceList(): Service[]
  { return this._services.getValue(); }


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
        'owner': {name: 'otter'},
        'lastModified': {
          'user': 'otter',
          'timestamp': new Date(Date.now()),
        }
      },
      {
        '_id': '2',
        'name': 'two',
        'owner': {name: 'fred'},
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
        'owner': {name: 'otter'},
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
        'owner': {name: 'george'},
      },
      {
        '_id': '5',
        'name': 'five',
        'basePath': '/',
        'type': ServiceType.SOAP,
        'group': {'name': 'Unit'},
        'owner': {name: 'george'},
      }
    ]);
  }


  publishLargeDummyDataSet(): void
  {
    const data = new Array<Service>();
    const chance = Chance.Chance();

    for (let i = 5000; i > 0; i--)
    {
      const item = new Service();
      item._id = i.toString();
      item.name = chance.weighted(['resource', 'dataservice', 'service'], [5, 2, 1])
                  + '-' + chance.word();

      item.type = chance.integer({min: ServiceType.SOAP, max: ServiceType.MQ}) as ServiceType;
      item.basePath = '/v' + i;

      item.group = {
        name: chance.weighted(['VS-Unit', 'VS-Regression', 'VS-Sandbox'], [5, 5, 1])
      } as Group;

      item.owner = {
        name: chance.weighted(['john', 'paul', 'george', 'ringo', 'otter'], [1, 1, 1, 1, 5]),
      } as MockiatoUser;

      item.lastModified = {
        user: chance.weighted(['john', 'paul', 'george', 'ringo', 'otter'], [1, 1, 1, 1, 5]),
        timestamp: moment().add(chance.integer({min: -1 * 356 * 5, max: 0}), 'd').toDate(),
      } as LastModifiedDetail;

      data.push(item);
    }

    this._services.next(data);
  }
}
