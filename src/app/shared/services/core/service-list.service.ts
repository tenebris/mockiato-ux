import {Injectable} from '@angular/core';
import {CoreSenderService} from './core-sender.service';
import {Service} from '../../model/service';

// HACK: for initial testing only
// TODO: use authenticated user-id
// TODO: add ability to query a specific list of services -- e.g. for favorites and history lists
const _ServicesQueryUrl = '/services/user/otter';

@Injectable({providedIn: 'root'})
export class ServiceListService {

  constructor(private sender: CoreSenderService) {}

  getAllServices(): Service[] {
    const result: Array<Service> = [];
    this.sender.simpleQuery(_ServicesQueryUrl)
      .subscribe((data: any) => {
        console.log(data); // DEBUG: output result to log for now...
        return [ // HACK: provides breakpoint and static data for early testing...
          {'name': 'one'},
          {'name': 'two'},
          {'name': 'three'},
        ];
      });
    return result;
  }
}
