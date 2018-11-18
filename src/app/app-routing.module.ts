import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PrototypeUxComponent} from './prototype-ux/prototype-ux.component';

const routes: Routes = [
  {path: 'prototype', component: PrototypeUxComponent},
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
export class AppRoutingModule
{
}
