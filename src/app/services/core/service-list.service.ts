import {Injectable} from '@angular/core';
import {CoreSenderService} from './core-sender.service';

const _SystemsQueryUrl = '/systems';

@Injectable({providedIn: 'root'})
export class ServiceListService {

  constructor(private sender: CoreSenderService) {}

  getAllServices(): ServiceList[] {
    const result: Array<ServiceList> = [];
    this.sender.simpleQuery(_SystemsQueryUrl)
      .subscribe((data: any) => {
        console.log(data); // HACK: provides breakpoint for early testing...
      });
    return result;
  }
}

export interface ServiceList {
  name: string;
}
