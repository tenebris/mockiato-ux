import {Injectable} from '@angular/core';
import {CoreSenderService} from '../core-sender/core-sender.service';
import {Service, ServiceType} from '../../../model/service/service';
import {appLogger} from '../../../app-logger';


// HACK: for initial testing only
// TODO: use authenticated user-id
// TODO: add ability to query a specific list of services -- e.g. for favorites and history lists
// noinspection JSUnusedLocalSymbols -- TODO: remove when referenced
const _initialViewQueryUrl = '/services/user/otter';
const _findServiceQueryUrl = '/services/';


@Injectable({providedIn: 'root'})
export class ServiceListService
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private sender: CoreSenderService) {}


  public findAll(): Service[]
  {
    let result: Array<Service> = [];
    // this.sender.simpleQuery(_initialViewQueryUrl);
    // .subscribe((data: any) => {
    //   appLogger().debug(data); // DEBUG: output result to log for now...
    //   // FiXME (otter): figure out how to add data -- the data below doesn't make it back to component
    //   result = [
    //     {
    //       '_id': '1',
    //       'name': 'upm4:resource-clm-chwy-pharmacyclaims-v1',
    //       'type': ServiceType.REST,
    //       'group': {'name': 'Unknown'},
    //       'owner': 'otter',
    //       lastModified: {
    //         'user': 'otter',
    //         'timestamp': new Date(Date.now()),
    //       }
    //     },
    //     {
    //       '_id': '3',
    //       'name': 'upm4:dataservice-cams-myuhcreceiverservice-v9',
    //       'type': ServiceType.SOAP,
    //       'group': {'name': 'Unknown'},
    //       'owner': 'otter',
    //       lastModified: {
    //         'user': 'otter',
    //         'timestamp': new Date(Date.parse('12/01/2017')),
    //       }
    //     }
    //   ];
    // });
    return result;
  }


  findService(id: string): Service
  {
    // FIXME (otter): grrrrrr
    appLogger().trace('starting fetch');
    this.sender.simpleQuery(_findServiceQueryUrl + id);
    appLogger().trace('fetch complete');

    return new Service({
      '_id': '42',
      'name': 'dummy-lookup',
      'type': ServiceType.MQ,
      'group': {'name': 'Unknown'},
      'owner': 'otter',
      'lastModified': {
        'user': 'otter',
        'timestamp': new Date(Date.now()),
      }
    });
  }


}
