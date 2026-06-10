import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { CardRoutingModule } from './card.routing.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { CardComponent } from './card.component';



@NgModule({
  declarations: [CardComponent ],
  imports: [
    CommonModule
    , ReactiveFormsModule
    , FormsModule
    , ReactiveFormsModule
    , BaseSharedModule
    ,  CardRoutingModule
    , MaterialModule

  ], exports: [CardComponent]
})
export class CardModule { }
