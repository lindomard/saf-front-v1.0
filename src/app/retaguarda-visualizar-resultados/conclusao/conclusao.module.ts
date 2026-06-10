import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ConclusaoComponent } from './conclusao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { ConclusaoRoutingModule } from './conclusao.routing.module';
import { MovimentoProdServModalModule } from '../movimento-prod-serv-modal/movimento-prod-serv-modal.module';
import { DadosComunModule } from 'src/app/dados-comuns/dados-comuns.module';
import { MatRowKeyboardSelectionModule } from 'src/app/mat-row-keyboard-selection/mat-row-keyboard-selection.module';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    ConclusaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BaseSharedModule,
    ConclusaoRoutingModule
    ,MovimentoProdServModalModule
    ,DadosComunModule
    ,MatRowKeyboardSelectionModule


  ]
})
export class ConclusaoModule { }
