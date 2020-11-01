import { Component, OnInit } from '@angular/core';
import {FarmService} from '../services/farm.service';
import {SectorService} from '../services/sector.service';
import {Router} from '@angular/router';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faThumbtack} from '@fortawesome/free-solid-svg-icons/faThumbtack';
import {AuthenticationService} from '../services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  coordinateIcon = faThumbtack;
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  showIcone = faInfo;

  sectors: any;
  currentFarm;
  agentMDM : any;

  constructor(private farmService:FarmService, private sectorService:SectorService,
              private authentication:AuthenticationService) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  ngOnInit(): void {
    this.agentMDM = this.authentication.isManager();
    if (this.sectorService.sectors == null){
      this.onGetSectors();
    }else {
      this.sectors = this.sectorService.sectors
    }
  }

  public onGetSectors(){
    this.farmService.getSectorsByFarm()
      .subscribe(data=>{
        console.log(data);
        this.sectors = data;
        this.currentFarm = this.farmService.sharedFarm;
        this.sectorService.sectors = data;
      },error => {
        console.log(error);
      })
  }

  addSector() {

  }

  onEditSector(s: any) {

  }

  onDeleteSector(s: any) {

  }

  onGetDetails(s: any) {

  }
}
