import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaltarRelatorioPadraoModalComponent } from './saltar-relatorio-padrao-modal/saltar-relatorio-padrao-modal.component';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SaltarRelatorioPadraoModalComponent
  ],
  imports: [
    CommonModule
    , BaseSharedModule
    , FormsModule
    , ReactiveFormsModule
    

  ]
})
export class SalvarRelatorioPadraoModule { }
