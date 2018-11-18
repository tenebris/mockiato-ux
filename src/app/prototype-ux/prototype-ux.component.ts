import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-prototype-ux',
  templateUrl: './prototype-ux.component.html',
  styleUrls: ['./prototype-ux.component.scss']
})
export class PrototypeUxComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
