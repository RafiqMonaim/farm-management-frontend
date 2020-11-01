import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
declare var $ : any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //public userFullName;
  public user;

  constructor(private authentication:AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authentication.currentUser
  }

}
