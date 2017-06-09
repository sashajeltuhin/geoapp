import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

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


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DistancePipe,
    LoginComponent,
    SearchComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthRoutingModule
  ],
  providers: [GeoService, MapService, HandlerService, ErrorService],
  bootstrap: [AppComponent],
  exports: [DistancePipe]
})
export class AppModule { }
