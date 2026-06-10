import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviarArquivosComponent } from './enviar-arquivos/enviar-arquivos.component';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArquivosRoutingModule } from './arquivos.routing.module';



@NgModule({
  declarations: [
    EnviarArquivosComponent
  ],
  imports: [
    CommonModule
    , MaterialModule, BaseSharedModule
    ,FormsModule
    ,ReactiveFormsModule
    , ArquivosRoutingModule
  ]
})
export class ArquivosModule { }
