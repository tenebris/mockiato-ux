import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication-service';
import {environment} from '../../../../environments/environment';
import {appLogger} from '../../app-logger';


@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.scss']
})
export class SimpleHeaderComponent implements OnInit
{
  readonly env = environment;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  constructor(public auth: AuthenticationService) { }


  ngOnInit()
  {
    appLogger().debug(`Initializing Header Component
    auth-state: ${this.auth.isAuthenticated()}
    internal-auth: ${environment.internalAuthModal}`);
  }

}
