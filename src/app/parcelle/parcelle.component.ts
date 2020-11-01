import { Component, OnInit } from '@angular/core';
import {SectorService} from '../services/sector.service';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-parcelle',
  templateUrl: './parcelle.component.html',
  styleUrls: ['./parcelle.component.css']
})
export class ParcelleComponent implements OnInit {
    /*  Icons */
    editIcon = faEdit;
    deleteIcon = faTrashAlt;
    showIcone = faInfo

    sectors: any;
    parcelles: any;
    agentMDM : any;

  constructor(private sectorService:SectorService,private authentication:AuthenticationService) { }

  ngOnInit(): void {
    this.agentMDM = this.authentication.isManager();
    this.onGetSectors();
  }

  onGetSectors() {
    this.sectorService.setSharedSectors()
      .subscribe(data=>{
        this.sectors = data;
        console.log(this.sectors);
      },error => {
        console.log(error);
      })
  }

  onSetSector(event: any) {
    console.log(event.target.value);
    this.sectorService.getParcelsBySector(event.target.value)
      .subscribe(data =>{
        console.log(data);
        this.parcelles = data;
      },error => {
        console.log(error);
      })
  }

  addParcelle() {

  }

  onGetParcelle(p: any) {

  }

  onEditParcelle(p: any) {

  }

  onDeleteParcelle(p: any) {

  }


}
