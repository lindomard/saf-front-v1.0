import { NgModule, Sanitizer } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MovimentoProdServModalComponent } from './movimento-prod-serv-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MovimentoProdServModalRoutingModule } from './movimento-prod-serv-modal.routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { CorrigirC170Module } from '../corrigir-c170-modal/corrigir-c170.module';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FileViwerModule } from 'src/app/components/components/file-viwer/file-viwer.module';
import { MatRowKeyboardSelectionModule } from 'src/app/mat-row-keyboard-selection/mat-row-keyboard-selection.module';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [

    MovimentoProdServModalComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BaseSharedModule,
    MovimentoProdServModalRoutingModule,
    CorrigirC170Module
    ,SimpleModalModule
    ,FileViwerModule
    ,MatRowKeyboardSelectionModule
    

    


  ]
})
export class MovimentoProdServModalModule { }
