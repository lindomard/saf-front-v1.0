import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { RetaguardaVisualizarResultadosComponent } from './retaguarda-visualizar-resultados/retaguarda-visualizar-resultados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { RetaguardaVisualizarResultadosRoutingModule } from './retaguarda-visualizar-resultados/retaguarda-visualizar-resultados.routing.module';
import { CorrigirC170ModalComponent } from './corrigir-c170-modal/corrigir-c170-modal.component';



@NgModule({
  declarations: [
    RetaguardaVisualizarResultadosComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    NgForOf,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BaseSharedModule,
    RetaguardaVisualizarResultadosRoutingModule

  ], exports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BaseSharedModule
    ]
})
export class RetaguardaVisualizarResultadosModule { }
