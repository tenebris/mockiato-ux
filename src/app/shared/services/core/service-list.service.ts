import {Injectable} from '@angular/core';
import {CoreSenderService} from './core-sender.service';
import {Service, ServiceType} from '../../model/service/service';

// HACK: for initial testing only
// TODO: use authenticated user-id
// TODO: add ability to query a specific list of services -- e.g. for favorites and history lists
const _ServicesQueryUrl = '/services/user/otter';


@Injectable({providedIn: 'root'})
export class ServiceListService
{

  constructor(private sender: CoreSenderService) {}


  public findAll(): Service[]
  {
    let result: Array<Service> = [];
    this.sender.simpleQuery(_ServicesQueryUrl)
      .subscribe((data: any) => {
        console.log(data); // DEBUG: output result to log for now...
        // FiXME (otter): figure out how to add data -- the data below doesn't make it back to component
        result = [
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
        ];
      });
    return result;
  }


  public findService(id: string)
  {
    return new Service({
      '_id': '42',
      'name': 'dummy-lookup',
      'type': ServiceType.MQ,
      'owner': 'otter',
      lastModified: {
        'user': 'otter',
        'timestamp': new Date(Date.now()),
      }
    });
  }

}
