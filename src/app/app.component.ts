import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import {faVectorSquare} from '@fortawesome/free-solid-svg-icons/faVectorSquare';
import {faTint} from '@fortawesome/free-solid-svg-icons/faTint';
import {faHandHoldingWater} from '@fortawesome/free-solid-svg-icons/faHandHoldingWater';
import {faPumpSoap} from '@fortawesome/free-solid-svg-icons/faPumpSoap';
import {faSeedling} from '@fortawesome/free-solid-svg-icons/faSeedling';
import {FarmService} from './services/farm.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Farm-Front';

  isLoggedIn$: Observable<boolean>;

  constructor(public authentication: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authentication.isLoggedIn;
  }


}
