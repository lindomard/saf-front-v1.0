import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { Teste2RoutingModule } from 'src/app/teste2/teste2-routing.module';
import { Teste2Component } from './teste2.component';



@NgModule({
  declarations: [
    Teste2Component
  ],
  imports: [
    CommonModule

    ,Teste2RoutingModule

// inicio

, BaseSharedModule
, FormsModule
, ReactiveFormsModule
//,NgxMaskModule.forRoot() 

// termino


  ]
})
export class Teste2Module { }
