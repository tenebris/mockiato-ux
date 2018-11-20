import {Injectable} from '@angular/core';
import {CoreSenderService} from './core-sender.service';

const _SystemsQueryUrl = '/services/user/otter'; // FIXME: for initial testing only

@Injectable({providedIn: 'root'})
export class ServiceListService {

  constructor(private sender: CoreSenderService) {}

  getAllServices(): ServiceList[] {
    const result: Array<ServiceList> = [];
    this.sender.simpleQuery(_SystemsQueryUrl)
      .subscribe((data: any) => {
        console.log(data); // HACK: provides breakpoint for early testing...
        return [
          {'name': 'one'},
          {'name': 'two'},
          {'name': 'three'},
        ];
      });
    return result;
  }
}

export interface ServiceList {
  name: string;
}
