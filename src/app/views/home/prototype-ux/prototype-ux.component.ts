import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../shared/services/auth/authentication-service';


@Component({
  selector: 'app-prototype-ux',
  templateUrl: './prototype-ux.component.html',
  styleUrls: ['./prototype-ux.component.scss']
})
export class PrototypeUxComponent implements OnInit
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~
  constructor(public auth: AuthenticationService) {}


  ngOnInit() {}

}
