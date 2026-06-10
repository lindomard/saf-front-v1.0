import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ProdutoXCfopComponent } from './produto-x-cfop/produto-x-cfop.component';
import { produtoXCfopRoutingModule } from './produto-x-cfop.routing.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { ProdutoXCfopDetalhesComponent } from './produto-x-cfop-detalhes/produto-x-cfop-detalhes.component';
import { MatRowKeyboardSelectionModule } from '../mat-row-keyboard-selection/mat-row-keyboard-selection.module';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FileViwerModule } from '../components/components/file-viwer/file-viwer.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DadosComunModule } from '../dados-comuns/dados-comuns.module';



@NgModule({
  declarations: [
    ProdutoXCfopComponent,
    ProdutoXCfopDetalhesComponent
  ],
  imports: [
    CommonModule, BaseSharedModule
    , MaterialModule
    , CommonModule
    , NgFor
    , produtoXCfopRoutingModule

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
export class ProdutoXCfopModule { }
