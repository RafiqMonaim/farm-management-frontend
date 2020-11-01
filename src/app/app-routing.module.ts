import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FarmComponent} from './farm/farm.component';
import {HomeComponent} from './home/home.component';
import {SectorComponent} from './sector/sector.component';
import {ApportEauComponent} from './apport-eau/apport-eau.component';
import {WaterStationComponent} from './water-station/water-station.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {TestConformiteComponent} from './test-conformite/test-conformite.component';
import {ParcelleComponent} from './parcelle/parcelle.component';
import {OperateurComponent} from './operateur/operateur.component';


const routes: Routes = [

  {path : "" , redirectTo: '/login', pathMatch: 'full' },
  {path : "login" , component : LoginComponent },
  {path : "home" , component:HomeComponent, children : [
      {path :'profile', component : ProfileComponent },
      {path:"farm",component:FarmComponent },
      {path:"sector",component:SectorComponent},
      {path:"station",component:WaterStationComponent},
      {path:"apportEau",component:ApportEauComponent},
      {path:"parcelle",component:ParcelleComponent},
      {path :"testConformite", component : TestConformiteComponent },
      {path :"operateur", component : OperateurComponent }
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
