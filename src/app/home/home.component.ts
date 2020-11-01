import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FarmService} from '../services/farm.service';
import {faTint} from '@fortawesome/free-solid-svg-icons/faTint';
import {faHandHoldingWater} from '@fortawesome/free-solid-svg-icons/faHandHoldingWater';
import {faVectorSquare} from '@fortawesome/free-solid-svg-icons/faVectorSquare';
import {faPumpSoap} from '@fortawesome/free-solid-svg-icons/faPumpSoap';
import {faSeedling} from '@fortawesome/free-solid-svg-icons/faSeedling';
import {AuthenticationService} from '../services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*  Icons */
  sectorIcon = faVectorSquare;
  eauIcon = faTint;
  testWaterIcon = faHandHoldingWater;
  WaterStationIcon = faPumpSoap;
  greffeIcone = faSeedling;

  public farms;
  public currentFarm;
  public user;
  public role;
  public admin: any;


  constructor(private farmService:FarmService,private authentication:AuthenticationService,
              private router:Router) {
    $('#btn').on('click', function (e) {
      $('#btn').each(function () {
        $(this).addClass('active');
      })
    });
  }

  ngOnInit(): void {
    this.onGetFarms();
    this.onGetCurrentUser();
    this.admin = this.authentication.isAdmin();
  }

    public onGetFarms(){
      this.farmService.getAllFarms()
        .subscribe(data =>{
          this.farms = data;
        },error => {
          console.log(error);
        })
    }

    public onGetSectors(event: any) {
        this.farmService.getFarm(event.target.value)
          .subscribe(data=>{
            this.currentFarm=data;
            this.farmService.sharedFarm=data;
            //console.log(data);
          },error => {
            console.log(error);
          })
    }

    public onGetCurrentUser(){
      this.authentication.getCurrentUser()
        .subscribe(data =>{
          // @ts-ignore
          this.user = data.nom+" "+data.prenom;
          // @ts-ignore
          this.role = data.roles[0].roleName;
          this.authentication.currentUser = data;
        },error => {
          console.log(error);
        })
    }


  onCheckFarm() {
    if (this.currentFarm == null){
      alert("Sélectionner la ferme en premier ! ");
      this.router.navigate(['home']);
    }
  }

  onLogout() {
    this.authentication.logout();
  }
}
