import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FarmComponent } from './farm/farm.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { SectorComponent } from './sector/sector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApportEauComponent } from './apport-eau/apport-eau.component';
import { WaterStationComponent } from './water-station/water-station.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TestConformiteComponent } from './test-conformite/test-conformite.component';
import { ParcelleComponent } from './parcelle/parcelle.component';
import { OperateurComponent } from './operateur/operateur.component';


@NgModule({
  declarations: [
    AppComponent,
    FarmComponent,
    HomeComponent,
    SectorComponent,
    ApportEauComponent,
    WaterStationComponent,
    LoginComponent,
    ProfileComponent,
    TestConformiteComponent,
    ParcelleComponent,
    OperateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
