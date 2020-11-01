import { Component, OnInit } from '@angular/core';
import {FarmService} from '../services/farm.service';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons/faLocationArrow';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faTree} from '@fortawesome/free-solid-svg-icons/faTree';
import {faLandmark} from '@fortawesome/free-solid-svg-icons/faLandmark';
import {faSquare} from '@fortawesome/free-solid-svg-icons/faSquare';
import {faThumbtack} from '@fortawesome/free-solid-svg-icons/faThumbtack';
import {faPumpSoap} from '@fortawesome/free-solid-svg-icons/faPumpSoap';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {
  /*  Icons  */
  userIcon = faUser;
  treeIcon = faTree;
  coordinateIcon = faThumbtack;
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  showIcone = faInfo;
  squareIcon=faSquare;
  /*
  pumpIcon = faPumpSoap;
  houseIcon =faLandmark;
  localIcon = faLocationArrow;
  */

  public currentCity; public currentFarm;
  public cities;
  public farms;
  constructor(private farmService:FarmService) { }

  ngOnInit(): void {
    this.farmService.getCities()
      .subscribe(data =>{
        this.cities = data;
      },error => {
        console.log(error);
      })
  }

  public OnGetFarms(city) {
    this.currentCity = city;
    this.farmService.getFarms(city)
      .subscribe(data =>{
        this.farms = data;
      },error => {
        console.log(error);
      })
  }

  onGetFarm(f: any) {

  }

  onEditFarm(f: any) {

  }

  onDeleteFarm(f: any) {

  }
}
