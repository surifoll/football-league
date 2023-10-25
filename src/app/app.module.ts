import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FixturesComponent } from './fixtures/fixtures.component';

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    FixturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
