import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { CorrigirC170ModalComponent } from './corrigir-c170-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { CorrigirC170RoutingModule } from './corrigir-c170.routing.module';



@NgModule({
  declarations: [
    CorrigirC170ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    NgForOf,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BaseSharedModule,
    CorrigirC170RoutingModule

  ]
})
export class CorrigirC170Module { }
