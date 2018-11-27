import {Injectable} from '@angular/core';
import {CoreSenderService} from '../core-sender/core-sender.service';
import {Service} from '../../../model/service/service';
import {appLogger} from '../../../app-logger';


// HACK: for initial testing only
// TODO: use authenticated user-id
// TODO: add ability to query a specific list of services -- e.g. for favorites and history lists
// noinspection JSUnusedLocalSymbols -- TODO: remove when referenced
const _initialViewQueryUrl = '/services/user/otter';
const _findServiceQueryUrl = '/services/';


function mapCoreDataToService(data: object): Service
{
  appLogger().trace('starting mapping of core data to service:', data);
  const s: any = {};
  Object.keys(data).forEach(key => {
    switch (key)
    {
      case '_id':
        s._id = data[key];
        break;

      case 'user':
        s.owner = {
          _id: data[key]['_id'],
          mail: data[key]['mail'],
          name: data[key]['uid']
        };
        break;

      case 'name':
        s.name = data[key];
        break;

      case 'type':
        s.type = data[key];
        break;

      case 'sut':
        s.group = {
          _id: data[key]['_id'],
          name: data[key]['name']
        };
        break;

      case 'lastModified':
        s.lastModified = data[key];
        break;

      default:
        appLogger().warn(`found unmapped service key[${key}] from backend -- ignoring`);
    }
  });

  return new Service(s);
}


@Injectable({providedIn: 'root'})
export class ServiceListService
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private sender: CoreSenderService) {}


  public findAll(): Service[]
  {
    const result: Array<Service> = [];
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


  async findService(id: string): Promise<Service>
  {
    appLogger().trace('starting fetch of service:' + id);

    const data = await this.sender.simpleQuery(_findServiceQueryUrl + id)
      .then(response => {
        return mapCoreDataToService(response);
      });

    appLogger().trace('fetch complete for service:' + id, data);

    return data;

    // TODO: add environment switch such as 'useLocalMocks' to return local json files.
    // return new Service({
    //   '_id': '42',
    //   'name': 'dummy-lookup',
    //   'type': ServiceType.MQ,
    //   'group': {'name': 'Unknown'},
    //   'owner': 'otter',
    //   'lastModified': {
    //     'user': 'otter',
    //     'timestamp': new Date(Date.now()),
    //   }
    // });
  }


}
