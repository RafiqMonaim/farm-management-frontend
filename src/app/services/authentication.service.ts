import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = 'http://localhost:8080';
  public  jwtToken: string;
  public roles: Array<any>[];

  public currentUser;
  public farmUsers;

  constructor(private http:HttpClient, private router:Router) { }

  login(user) {
    return this.http.post(this.host + '/login', user, {observe : 'response'});
    // tslint:disable-next-line:max-line-length
    // On utilise "option {observe : 'response'}" pour qu'il ne fait pas convertir en JSON. car login est une action de Spring Security et ne return pas un object JSON
    // alor on s'interesse juste à la reponse http genre 200(ok) 404 ....
  }

  saveToken(jwtToken: string) {
    this.jwtToken = jwtToken;
    localStorage.setItem('token', jwtToken);
    const jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isAdmin() {
    for (const r of this.roles) {
      // @ts-ignore
      if (r.authority === 'ADMIN' ) { return true; }
    }
    return false;
  }

  isTechnicien() {
    for (const r of this.roles) {
      // @ts-ignore
      if (r.authority === 'TECHNICIEN' ) { return true; }
    }
    return false;
  }

  isManager() {
    for (const r of this.roles) {
      // @ts-ignore
      if (r.authority === 'MANAGER' ) { return true; }
    }
    return false;
  }

  getCurrentUser() {
    if (this.jwtToken == null) { this.loadToken(); }
    //this.currentUser = this.http.get(this.host + '/profile', {headers: new HttpHeaders({ Authorization : this.jwtToken})});
    return this.http.get(this.host + '/profile', {headers: new HttpHeaders({ Authorization : this.jwtToken})});
  }

  getOperateurs(){
    if (this.jwtToken == null) { this.loadToken(); }
    return this.http.get(this.host + '/users', {headers: new HttpHeaders({ Authorization : this.jwtToken})});
  }

  getRegisters(){
    if (this.jwtToken == null) { this.loadToken(); }
    return this.http.get(this.host + '/registers', {headers: new HttpHeaders({ Authorization : this.jwtToken})});
  }

  sendRegister(data : any){
    //if (this.jwtToken == null) { this.loadToken(); }
    return this.http.post(this.host + '/register',data);
  }

  activateAccount(role:any,id:any){
    if (this.jwtToken == null) { this.loadToken(); }
    return this.http.put(this.host + '/registers/'+id,role, {headers: new HttpHeaders({ Authorization : this.jwtToken})});
  }

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  public onIdentify(){
    //this.isAuthenticated =1;
    this.loggedIn.next(true);
    this.router.navigate(['/farm'])
  }

/*  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }*/

}
