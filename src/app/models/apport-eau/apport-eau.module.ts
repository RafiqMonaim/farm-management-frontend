import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ApportEauModule {
  public dateOperation: Date;
  public dureeIrrigation: number;
  public et0: number;
  public kc: number;
  public secteur : any;
  public stationPompage : any;
}
