import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {SENDER_CONFIG} from './core-sender-variables';
import {appLogger} from '../../app-logger';


@Injectable({
  providedIn: 'root'
})
export class CoreSenderService
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private http: HttpClient) {}


  async simpleQuery(path: string)
  {
    return await this.http.get(SENDER_CONFIG.target + path, {observe: 'response'}).toPromise()
      .then(x => { appLogger().debug(x); });

  }
}
