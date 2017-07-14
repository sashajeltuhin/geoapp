import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import { HandlerService } from './handler.service';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { GeoService } from './geo.service';
import { DistancePipe } from './distance.pipe';
import { AuthRoutingModule }      from './auth/auth.module';
import { LoginComponent }          from './auth/login.component';
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error/error.service';
import { SecretsComponent } from './secrets/secrets.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DistancePipe,
    LoginComponent,
    SearchComponent,
    ErrorComponent,
    SecretsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    AuthRoutingModule
  ],
  providers: [Title, GeoService, MapService, HandlerService, ErrorService],
  bootstrap: [AppComponent],
  exports: [DistancePipe]
})
export class AppModule { }
