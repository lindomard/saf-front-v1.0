import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AnaliseEstruturalComponent } from './analise-estrutural.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MatRowKeyboardSelectionModule } from 'src/app/mat-row-keyboard-selection/mat-row-keyboard-selection.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalvarRelatorioPadraoModule } from 'src/app/dados-comuns/salvar-relatorio-padrao/salvar-relatorio-padrao.module';
import { ConfiguracoesModule } from 'src/app/configuracoes/configuracoes.module';
import { DadosComunModule } from 'src/app/dados-comuns/dados-comuns.module';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { AnaliseEstruturalRoutingModule } from './Analise-estrutural.routing.module';



@NgModule({
  declarations: [
    AnaliseEstruturalComponent
  ],
  imports: [

    ScrollingModule
    , MaterialModule
    , BaseSharedModule
    , AnaliseEstruturalRoutingModule
    , NgFor

    , MatRowKeyboardSelectionModule

    , ReactiveFormsModule



    , FormsModule
    , SalvarRelatorioPadraoModule
    , ConfiguracoesModule
    , CommonModule
    , DadosComunModule




  ], providers: [BaixarArquivosService]
})

export class AnaliseEstruturalModule { }
