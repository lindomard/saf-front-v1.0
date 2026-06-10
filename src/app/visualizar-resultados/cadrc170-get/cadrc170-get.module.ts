import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Cadrc170GetComponent } from './cadrc170-get/cadrc170-get.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { cadrc170GetRoutingModule } from './cadrc170-get.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SalvarRelatorioPadraoModule } from 'src/app/dados-comuns/salvar-relatorio-padrao/salvar-relatorio-padrao.module';
import { ConfiguracoesModule } from 'src/app/configuracoes/configuracoes.module';
import { DadosComunModule } from 'src/app/dados-comuns/dados-comuns.module';
import { MatRowKeyboardSelectionDirective } from 'src/app/mat-row-keyboard-selection/mat-row-keyboard-selection.directive';
import { MatRowKeyboardSelectionModule } from 'src/app/mat-row-keyboard-selection/mat-row-keyboard-selection.module';



@NgModule({
  declarations: [
    Cadrc170GetComponent
  ],
  imports: [
    ScrollingModule
    , MaterialModule
    , BaseSharedModule
    , cadrc170GetRoutingModule
    , NgFor

    ,MatRowKeyboardSelectionModule

    , ReactiveFormsModule


    , ScrollingModule

    , FormsModule
    ,SalvarRelatorioPadraoModule
    ,ConfiguracoesModule
    ,CommonModule
    ,DadosComunModule
    


    




  ], providers: [BaixarArquivosService]
})
export class Cadrc170GetModule { }
