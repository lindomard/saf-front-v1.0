import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { DocModalRoutingModule } from './doc-modal.routing.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { CardModule } from '../components/components/card/card.module';
import { DocModalComponent } from './doc-modal.component';
import { RetaguardaVisualizarResultadosModule } from '../retaguarda-visualizar-resultados/retaguarda-visualizar-resultados.module';



@NgModule({
  declarations: [DocModalComponent],
  imports: [
    CommonModule
    , ReactiveFormsModule
    , FormsModule
    , ReactiveFormsModule
    , BaseSharedModule
    ,  DocModalRoutingModule
    , MaterialModule
    , CardModule
    , RetaguardaVisualizarResultadosModule


  ]
})
export class DocModalModule { }
