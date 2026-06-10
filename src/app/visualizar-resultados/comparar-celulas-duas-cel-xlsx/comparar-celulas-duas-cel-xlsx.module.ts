import { NgModule } from '@angular/core';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { CompararCelulasDuasCelXlsxComponent } from './comparar-celulas-duas-cel-xlsx.component';
import { compararCelulasDuasCelXlsxRoutingModule } from './comparar-celulas-duas-cel-xlsx.routing.module';



@NgModule({
  declarations: [
    CompararCelulasDuasCelXlsxComponent
  ],
  imports: [
    ScrollingModule
    , MaterialModule
    , BaseSharedModule
    , compararCelulasDuasCelXlsxRoutingModule
    , CommonModule
    , NgFor


    , ReactiveFormsModule


    , ScrollingModule

   , FormsModule
   , ReactiveFormsModule
     

  ], providers: [BaixarArquivosService], exports: [CommonModule]
})
export class CompararCelulasDuasCelXlsxModule { }
