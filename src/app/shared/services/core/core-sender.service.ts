import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {SENDER_CONFIG} from './core-sender-variables';

@Injectable({
  providedIn: 'root'
})
export class CoreSenderService {
  constructor(private http: HttpClient) {}

  simpleQuery(path: string) {
    return this.http.get(SENDER_CONFIG.target + path, { observe: 'response' });
  }
}
