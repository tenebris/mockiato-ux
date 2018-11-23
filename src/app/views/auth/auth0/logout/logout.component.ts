import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../shared/services/auth/authentication-service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~
  constructor(private auth: AuthenticationService) { }


  ngOnInit()
  {
    this.auth.logout();
  }

}
