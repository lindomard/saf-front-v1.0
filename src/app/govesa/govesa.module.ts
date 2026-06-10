import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LerDadosDoPdfComponent } from './ler-dados-do-pdf/ler-dados-do-pdf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { GovesaRoutingModule } from './govesa.routing.module';



@NgModule({
  declarations: [
    LerDadosDoPdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GovesaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BaseSharedModule,


  ]
})
export class GovesaModule { }
