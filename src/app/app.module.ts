import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrototypeUxComponent } from './prototype-ux/prototype-ux.component';
import { ShowIfAuthenticatedDirective } from './show-if-authenticated.directive';
import { CallbackComponent } from './callback/callback.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PrototypeUxComponent,
    ShowIfAuthenticatedDirective,
    CallbackComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
