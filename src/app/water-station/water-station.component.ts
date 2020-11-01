import { Component, OnInit } from '@angular/core';
import {FarmService} from '../services/farm.service';
import {faThumbtack} from '@fortawesome/free-solid-svg-icons/faThumbtack';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faSuperpowers} from '@fortawesome/free-brands-svg-icons/faSuperpowers';
import {faNeuter} from '@fortawesome/free-solid-svg-icons/faNeuter';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-water-station',
  templateUrl: './water-station.component.html',
  styleUrls: ['./water-station.component.css']
})
export class WaterStationComponent implements OnInit {

  /* Icons */
  coordinateIcon = faThumbtack;
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  showIcone = faInfo;
  typeIcon = faNeuter;
  powerIcon = faSuperpowers;

  stations: any;
  agentMDM : any;

  constructor(private farmService:FarmService,private authentication:AuthenticationService) { }

  ngOnInit(): void {
    this.agentMDM = this.authentication.isManager();
    this.onGetWaterStations();
  }

  public onGetWaterStations(){
    this.farmService.getStationByFarm()
      .subscribe(data =>{
        this.stations =data;
        console.log(data);
      },error => {
        console.log(error);
      })

  }

  onGetStation(f: any) {

  }

  onEditStation(f: any) {

  }

  onDeleteStation(f: any) {

  }
}
