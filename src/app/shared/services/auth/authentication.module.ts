import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from './authentication-service';
import {Auth0AuthenticationService} from './auth0/auth0-authentication.service';
import {ModalService} from '../modal-service/modal.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: AuthenticationService, useClass: Auth0AuthenticationService},
  ],
})
export class AuthenticationModule {}
