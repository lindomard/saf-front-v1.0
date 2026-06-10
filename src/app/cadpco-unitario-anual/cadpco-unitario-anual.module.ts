import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CadpcoUnitarioAnualComponent } from './cadpco-unitario-anual/cadpco-unitario-anual.component';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { CadpcoUnitarioAnualRoutingModule } from './cadpco-unitariio-anual.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRowKeyboardSelectionModule } from '../mat-row-keyboard-selection/mat-row-keyboard-selection.module';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FileViwerModule } from '../components/components/file-viwer/file-viwer.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DadosComunModule } from '../dados-comuns/dados-comuns.module';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { CadpcoUnitarioAnualInventarioComponent } from './cadpco-unitario-anual-inventario/cadpco-unitario-anual-inventario.component';



@NgModule({
  declarations: [
    CadpcoUnitarioAnualComponent,
    CadpcoUnitarioAnualInventarioComponent
  ],
  imports: [
    CommonModule, BaseSharedModule
    , MaterialModule
    , NgFor
    , CadpcoUnitarioAnualRoutingModule

    , ReactiveFormsModule
    , MatRowKeyboardSelectionModule

    , SimpleModalModule
    , FileViwerModule

    ,FormsModule,
    FlexLayoutModule
    ,DadosComunModule


  ], providers: [BaixarArquivosService
  
    ]
})
export class CadpcoUnitarioAnualModule { }
