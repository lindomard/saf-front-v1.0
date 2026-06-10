import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cadrc100ConsultaComponent } from './cadrc100-consulta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { Cadrc100ConsultaRoutingModule } from './cadrc100-consulta.routing.module';
import { CdkDetailRowDirective } from './cdk-detail-row.directive';



@NgModule({
  declarations: [
    Cadrc100ConsultaComponent
    ,CdkDetailRowDirective
  ],
  imports: [
    CommonModule
    , ReactiveFormsModule
    , FormsModule
    , ReactiveFormsModule
    , BaseSharedModule
    ,  Cadrc100ConsultaRoutingModule
    , MaterialModule

  ]
})
export class Cadrc100ConsultaModule { }
