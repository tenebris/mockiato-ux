import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CallbackComponent} from './views/auth/auth0/callback/callback.component';
import {LogoutComponent} from './views/auth/auth0/logout/logout.component';
import {BrowseSystemV1Component} from './views/v1/browse-system/browse-system-v1.component';
import {BrowseSystemV2Component} from './views/v2/browse-system-v2/browse-system-v2.component';
import {ServiceDetailV1Component} from './views/v1/service-detail/service-detail-v1.component';
import {CommingSoonComponent} from './views/misc/comming-soon/comming-soon.component';
import {PageNotFoundComponent} from './views/misc/page-not-found/page-not-found.component';
import {PrototypeUxComponent} from './views/home/prototype-ux/prototype-ux.component';
import {MockDataGenerationV1Component} from './views/v1/mock-data-generation/mock-data-generation-v1.component';


const routes: Routes = [
  {path: 'callback', component: CallbackComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'prototype', component: PrototypeUxComponent},
  {path: 'prototype/browse/v1', component: BrowseSystemV1Component},
  {path: 'prototype/browse/v1/service/:id', component: ServiceDetailV1Component},
  {path: 'prototype/browse', component: BrowseSystemV2Component},
  {path: 'prototype/browse/service/:id', component: ServiceDetailV1Component},
  {path: 'prototype/mock', component: CommingSoonComponent},
  {path: 'prototype/data', component: MockDataGenerationV1Component},
  {path: 'api', component: CommingSoonComponent},
  {path: 'wiki', component: CommingSoonComponent},
  {
    path: '',
    redirectTo: '/prototype',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
