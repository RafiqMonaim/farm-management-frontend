import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  public host:string = "http://localhost:8080";
  public sharedFarm;
  public currentSectors;
  public currentStations;

  constructor(private http:HttpClient,private authentication:AuthenticationService) { }

  public getCities(){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(this.host+"/villes",{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public getAllFarms(){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(this.host+"/fermes",{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public getFarms(city) {
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(city._links.fermes.href,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public getFarm(url:string){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(url,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public getSectorsByFarm(){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    this.currentSectors = this.http.get(this.sharedFarm._links.secteurs.href,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
      return this.currentSectors;
  }

  public getStationByFarm(){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    this.currentStations = this.http.get(this.sharedFarm._links.stationPompages.href,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
    return this.currentStations;
  }

  public getApportEauxByStation(urlStation: any){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(urlStation,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public addTestConformite(testConforme: any){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.post(this.host+"/testConformites",testConforme,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }
}
