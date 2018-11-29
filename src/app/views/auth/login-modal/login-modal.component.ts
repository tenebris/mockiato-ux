import {Component, OnInit} from '@angular/core';


/**
 * Provides a modal dialog for the purposed of authentication when not using an external service.
 * This will generally only be used local development and when authentication is delegated to the core.
 */
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit
{
  ngOnInit(): void {}


  // TODO: implement simple form which does authentication...
}
