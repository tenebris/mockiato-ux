import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication-service';
import {appLogger} from '../../app-logger';


@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.scss']
})
export class SimpleHeaderComponent implements OnInit
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(public auth: AuthenticationService) { }


  ngOnInit() {
    appLogger().debug('auth-state: ' + this.auth.isAuthenticated());
  }

}
