import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../shared/services/auth/authentication-service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~
  constructor(private auth: AuthenticationService) { }


  ngOnInit()
  {
    this.auth.handleAuthentication();
  }

}
