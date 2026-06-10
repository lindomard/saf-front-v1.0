import { NgModule } from '@angular/core';
import { ResultadosComponent } from './resultados/resultados.component';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { VisualizarResultadosRoutingModule } from './visualizar-resultados.routing.module';
import { CodItemComZerosAEsquerdaComponent } from './cod-item-com-zeros-a-esquerda/cod-item-com-zeros-a-esquerda.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SalvarRelatorioPadraoModule } from '../dados-comuns/salvar-relatorio-padrao/salvar-relatorio-padrao.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { DadosComunModule } from '../dados-comuns/dados-comuns.module';



@NgModule({
  declarations: [
    ResultadosComponent,
    CodItemComZerosAEsquerdaComponent
  ],
  imports: [
    ScrollingModule
    , MaterialModule
    , BaseSharedModule
    , VisualizarResultadosRoutingModule
    , CommonModule
    , NgFor



    , ReactiveFormsModule
    , SalvarRelatorioPadraoModule
    , BrowserModule
    ,DadosComunModule




  ], providers: [BaixarArquivosService], exports: [CommonModule]
})
export class VisualizarResultadosModule { }
