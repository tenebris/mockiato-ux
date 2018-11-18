import { Directive } from '@angular/core';

@Directive({
  selector: '[appShowIfAuthenticated]'
})
export class ShowIfAuthenticatedDirective {

  constructor() { }

}
