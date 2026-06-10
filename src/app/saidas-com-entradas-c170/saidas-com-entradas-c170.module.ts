import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { SaidasComEntradasC170Component } from './saidas-com-entradas-c170/saidas-com-entradas-c170.component';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SaidasComEntradasC170RoutingModule } from './saidas-com-entradas-c170.routing.module';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { DadosComunModule } from '../dados-comuns/dados-comuns.module';



@NgModule({
  declarations: [
    SaidasComEntradasC170Component
  ],
  imports: [
    CommonModule, BaseSharedModule
    , ScrollingModule
    , MaterialModule
    , CommonModule
    , NgFor
    , DadosComunModule

    ,SaidasComEntradasC170RoutingModule

     , ReactiveFormsModule

     
    ], providers: [BaixarArquivosService]
})
export class SaidasComEntradasC170Module { }
