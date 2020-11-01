import { Component, OnInit } from '@angular/core';
import {FarmService} from '../services/farm.service';
import {SectorService} from '../services/sector.service';
import {TestConformiteModule} from '../models/test-conformite/test-conformite.module';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-test-conformite',
  templateUrl: './test-conformite.component.html',
  styleUrls: ['./test-conformite.component.css']
})
export class TestConformiteComponent implements OnInit {
  /*Icons*/
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  showIcone = faInfo;

  technicien : any;
  sectors : any;
  parcelles : any
  testConformites : any
  dosesArray = new Array();
  array : any
  testConf = new TestConformiteModule();

  constructor(private farmService:FarmService,private sectorService:SectorService,
              private router:Router, private authentication:AuthenticationService) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    $(document).ready(function(){
      let next = 1;
      $(".add-more").click(function(e){
        e.preventDefault();
        const addto = '#inputGoutter' + next;
        const addRemove = '#inputGoutter' + (next);
        next = next + 1;
        const newIn = '<input autocomplete="off" class="form-control dose" id="inputGoutter'+ next +'" value=""' +
          'name="dose[]" min="0" step="0.1"  type="number" autocomplete="off" placeholder="dose goutteur '+ next +' ...">';
        const newInput = $(newIn);
        const removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-outline-danger remove-me" >-</button></div><div id="inputGoutter">';
        const removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#inputGoutter" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);

        $('.remove-me').click(function(e){
          e.preventDefault();
          const fieldNum = this.id.charAt(this.id.length - 1);
          const fieldID = '#inputGoutter' + fieldNum;
          $(this).remove();
          $(fieldID).remove();
        });
      });
    });
  }

  ngOnInit(): void {
    this.technicien = this.authentication.isTechnicien();
    this.onGetSectors();
    this.testConf.debitMin = 0;
    this.testConf.debitMoy = 0;
    this.testConf.coefficienUniform = 0;
  }

  onGetSectors() {
    this.sectorService.setSharedSectors()
      .subscribe(data=>{
        this.sectors = data;
        //console.log(this.sectors);
      },error => {
        console.log(error);
      })
  }

  onSetSector(event: any) {
    //console.log(event.target.value);
    this.sectorService.getParcelsBySector(event.target.value)
      .subscribe(data =>{
        //console.log(data);
        this.parcelles = data;
      },error => {
        console.log(error);
      })
  }

  onSetParcelle(event: any) {
    //console.log(event.target.value);
    this.sectorService.getTestConformeByParcel(event.target.value)
      .subscribe(data =>{
        this.testConformites = data;
      },error => {
        console.log(error);
      })
  }

  /* les fonction du formulaire d'ajout d'un teste*/
  selectedSector(event: any) {
    this.onSetSector(event);
  }

  selectedParcelle(event: any) {
    console.log(event.target.value);
    this.testConf.parcelle = event.target.value;
  }

  setDoseGoutteur() {
    let doseArray = new Array();
    $('.dose').each(function(){
      doseArray.push($(this).val());
    });
    doseArray.sort();
    //console.log(doseArray);
     for (let i=0; i<doseArray.length;i++) {
          this.dosesArray.push(parseFloat(doseArray[i]));
        }
        this.dosesArray.sort(function(a, b){return a - b})
        //console.log(this.dosesArray);
            let summax = 0;
            for (let i=0; i<this.dosesArray.length;i++){
              summax += this.dosesArray[i];
            }
            //console.log(this.dosesArray);
            //console.log(summax);
            this.testConf.debitMoy = parseFloat((summax/this.dosesArray.length).toFixed(2));
            let moymax = summax/this.dosesArray.length;
            //console.log('la moy max des doses :'+moymax);

            let minarray = new Array();
            let summin = 0;
                for (let i=0; i<Math.trunc(this.dosesArray.length/4); i++ ){
                  minarray.push(parseFloat(this.dosesArray[i]));
                  summin += parseFloat(this.dosesArray[i]);
                }
                //console.log(minarray);
                this.testConf.debitMin = parseFloat((summin/minarray.length).toFixed(2));
                let moymin = summin/minarray.length;
                //console.log('la moymin des doses :'+moymin);

                let cu = 0 ;
                if(moymax!=0){
                  this.testConf.coefficienUniform = parseFloat((moymin/moymax).toFixed(4))*100;
                   cu = (moymin/moymax);
                }else {console.log('moy est null');}
                //console.log(cu);
                if (cu >= 0.9){this.testConf.description = 'Test bien Conforme';}
                else {this.testConf.description = 'Test non Conforme';}

                //console.log(this.testConf);
  }

  onAddTestConforme() {
    console.log(this.testConf);
    this.farmService.addTestConformite(this.testConf)
      .subscribe(response => {
        console.log(response);
        this.ngOnInit();
        this.router.navigate(['testConformite']);
      },error => {
        console.log(error);
      } )
  }
  /************************************/

  onGetTest(t: any) {

  }

  onEditTest(t: any) {

  }

  onDeleteTest(t: any) {

  }

}
