import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './views/misc/page-not-found/page-not-found.component';
import { PrototypeUxComponent } from './views/home/prototype-ux/prototype-ux.component';
import { ShowIfAuthenticatedDirective } from './show-if-authenticated.directive';
import { CallbackComponent } from './views/auth/callback/callback.component';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { SimpleHeaderComponent } from './shared/components/simple-header/simple-header.component';
import { BrowseSystemV1Component } from './views/v1/browse-system/browse-system-v1.component';
import { CommingSoonComponent } from './views/misc/comming-soon/comming-soon.component';
import { ServiceListComponent } from './shared/components/service-list/service-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { ServiceDetailV1Component } from './views/v1/service-detail/service-detail-v1.component';


@NgModule({
  declarations: [
    AppComponent,
    // Top-Level Views
    PageNotFoundComponent,
    PrototypeUxComponent,
    // Directives
    ShowIfAuthenticatedDirective,
    // Auth0 Related Components
    LogoutComponent,
    CallbackComponent,
    // Shared Components
    SimpleHeaderComponent,
    CommingSoonComponent,
    ServiceListComponent,
    // UX Views
    BrowseSystemV1Component,
    ServiceDetailV1Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // import after BrowserModule
    AgGridModule.withComponents([]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
