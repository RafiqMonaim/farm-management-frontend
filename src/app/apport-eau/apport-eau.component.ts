import { Component, OnInit } from '@angular/core';
import {FarmService} from '../services/farm.service';
import {SectorService} from '../services/sector.service';
import {ApportEauModule} from '../models/apport-eau/apport-eau.module';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-apport-eau',
  templateUrl: './apport-eau.component.html',
  styleUrls: ['./apport-eau.component.css']
})
export class ApportEauComponent implements OnInit {

  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  showIcone = faInfo;
  infoIcone = faQuestionCircle;

  sectors: any;
  stations: any;
  operations: any;
  sector : any;

  technicien : any;
  pluvioSys : number;
  dureeIrrigation : number;
  operation = new ApportEauModule();

  constructor(private farmService:FarmService,private sectorService:SectorService,
              private router:Router, private authentication:AuthenticationService) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  ngOnInit(): void {
    this.onGetSectors();
    this.onGetStations();
    this.operation.dureeIrrigation = 0;
    this.technicien = this.authentication.isTechnicien();
  }


  onGetSectors() {
    this.sectorService.setSharedSectors()
      .subscribe(data=>{
        this.sectors = data;
        //console.log(this.sectors);
        //this.currentFarm = this.farmService.sharedFarm;
        this.sectorService.sectors = data;
      },error => {
        console.log(error);
      })
  }

  onGetStations(){
    this.farmService.getStationByFarm()
      .subscribe(data=>{
        //console.log(data);
        this.stations = data;
      },error => {
        console.log(error);
      })
  }

  onSetSector(event: any) {
    console.log(event.target.value);
    this.sectorService.getApportEeauBySector(event.target.value)
      .subscribe(data =>{
        //console.log(data);
        this.operations = data;
      },error => {
        console.log(error);
      })
  }

  onSetStation(event: any) {
    console.log(event.target.value)
    this.farmService.getApportEauxByStation(event.target.value)
      .subscribe(data => {
        this.operations = data;
      },error => {
        console.log(error);
      })
  }
/* steps for adding a new water supply */
  selectedSector(event: any) {
    //console.log(event.target.value);
    this.operation.secteur = event.target.value;
    this.sectorService.getSector(event.target.value)
      .subscribe(data => {
        //console.log(data);
        this.sector = data;
        this.pluvioSys = this.sector.pluviometrieSys;
      },error => {
        console.log(error);
      })
  }
  selectedStation(event: any) {
    this.operation.stationPompage = event.target.value;
  }
/*************************************************/

  setTimeOperation() {
    this.dureeIrrigation = Math.round(((this.operation.et0 * this.operation.kc) / this.pluvioSys )* 60);
    this.operation.dureeIrrigation = this.dureeIrrigation;
  }

  onAddApportEaux() {
    console.log(this.operation);
    this.sectorService.addApportEau(this.operation)
      .subscribe(res => {
        console.log(res);
        this.ngOnInit();
        this.router.navigateByUrl("/apportEau")
      },error => {
        console.log(error);
      })
  }

  public onGetApporEau(secteur:any){

  }

  onEditOperation(s: any) {

  }

  onDeleteOperation(s: any) {

  }

}
