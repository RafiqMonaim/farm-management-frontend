import { Injectable } from '@angular/core';
import {FarmService} from './farm.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  public host:string = "http://localhost:8080";

  //public sharedSectors;
  public sectors;
  //currentSector;

  constructor(private http:HttpClient,private farmService:FarmService,
              private authentication:AuthenticationService) { }

  public getApportEeauBySector(urlSector:any){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
     return this.http.get(urlSector,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public getParcelsBySector(urlSector:any){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(urlSector,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public getTestConformeByParcel(urlParcel:any){
    return this.http.get(urlParcel,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public setSharedSectors(){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(this.farmService.sharedFarm._links.secteurs.href,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public getSector(urlSector:any){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.get(urlSector,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }

  public addApportEau(operation: any){
    if (this.authentication.jwtToken == null) { this.authentication.loadToken(); }
    return this.http.post(this.host+"/apportEaus",operation,{headers: new HttpHeaders({ Authorization : this.authentication.jwtToken})});
  }
}
