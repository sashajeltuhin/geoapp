import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard }   from './auth/authguard.service';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ErrorComponent } from './error/error.component';
import { SearchComponent } from './search/search.component';
import { SecretsComponent } from './secrets/secrets.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent,
    pathMatch: 'full'
  },
  {
    path: 'secrets',
    component: SecretsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'map/:search',
    component: MapComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'oops',
    component: ErrorComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
