import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CompararRegistrosC170Component } from './comparar-registros-c170.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { CompararRegistrosC170RoutingModule } from './comparar-registros-c170.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';



@NgModule({
  declarations: [
    CompararRegistrosC170Component
  ],
  imports: [
  
    ScrollingModule
    , MaterialModule
    , BaseSharedModule
    , CompararRegistrosC170RoutingModule
    , CommonModule
    , NgFor


    , ReactiveFormsModule


    , ScrollingModule

   , FormsModule
   , ReactiveFormsModule
     

  ], providers: [BaixarArquivosService], exports: [CommonModule]    
  
})
export class CompararRegistrosC170Module { }
