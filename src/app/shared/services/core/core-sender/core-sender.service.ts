import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {SENDER_CONFIG} from './core-sender-variables';


@Injectable({
  providedIn: 'root'
})
export class CoreSenderService
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(private http: HttpClient) {}


  simpleQuery(path: string): Promise<object>
  {
    return this.http.get<object>(SENDER_CONFIG.target + path).toPromise();
  }
}
