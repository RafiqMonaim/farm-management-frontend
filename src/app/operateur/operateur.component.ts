import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-operateur',
  templateUrl: './operateur.component.html',
  styleUrls: ['./operateur.component.css']
})
export class OperateurComponent implements OnInit {

  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  showIcone = faInfo;

  public operateurs;
  public registers;
  public admin;
  public rolename : string;
  public registerId : number;

  constructor(private authentication:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.onGetOperateurs()
    this.admin = this.authentication.isAdmin();
    //console.log(this.admin);
    if (this.authentication.isAdmin()){
      this.onGetRegisters();
    }
  }

  onGetOperateurs() {
    this.authentication.getOperateurs()
      .subscribe(data => {
        this.operateurs = data;
      },error => {
        console.log(error);
      })
  }

  onGetRegisters() {
    this.authentication.getRegisters()
      .subscribe(data=>{
        this.registers = data;
      },error => {
        console.log(error);
      })
  }

  setRole(event: any, id:any) {
    this.rolename = event.target.value;
    this.registerId = id;
    console.log(this.registerId +" "+this.rolename);
  }

  onActivateAccount() {
    if (this.rolename !=null && this.registerId != null ){
      this.authentication.activateAccount(this.rolename,this.registerId)
        .subscribe(resp =>{
          console.log(resp);
          this.router.navigate(['/operateur']);
        },error => {
          console.log(error);
        })
    }else {
      alert("Affecter un rôle avant d'activer le compte !");
      this.router.navigate(['/operateur']);
      ;}
  }

  onEditOperateur(f: any) {

  }

  onDeleteOperateur(f: any) {

  }



}
