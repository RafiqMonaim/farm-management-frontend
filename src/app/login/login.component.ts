import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode = 0;

  constructor(private authentication:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(user) {
    this.authentication.login(user)
      .subscribe(resp => {
          const jwtToken = resp.headers.get('Authorization');
          this.authentication.saveToken(jwtToken); // enregistrer le token dans le localstorage
          this.router.navigateByUrl('/home');
        },
        error => {
          this.mode = 1;
          console.log(error);
        });
  }


  onSendRequest(data : any) {
    console.log(data);
    this.authentication.sendRegister(data)
      .subscribe(resp =>{
        console.log(resp);
        this.ngOnInit();
      },error => {
        console.log(error);
      })
  }
}
