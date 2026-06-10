import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GerarCadrc170SefazComponent } from './gerar-cadrc170-sefaz/gerar-cadrc170-sefaz.component';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRowKeyboardSelectionModule } from '../mat-row-keyboard-selection/mat-row-keyboard-selection.module';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FileViwerModule } from '../components/components/file-viwer/file-viwer.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DadosComunModule } from '../dados-comuns/dados-comuns.module';
import { GerarCadrc170SefazRoutingModule } from './gerar-cadrc170-sefaz.routing.module';



@NgModule({
  declarations: [
    GerarCadrc170SefazComponent
  ],
  imports: [
    CommonModule, BaseSharedModule
    , MaterialModule
    , CommonModule
    , NgFor
    , ReactiveFormsModule
    ,GerarCadrc170SefazRoutingModule

    , FormsModule,
    FlexLayoutModule

  ]
})
export class GerarCadrc170SefazModule { }
