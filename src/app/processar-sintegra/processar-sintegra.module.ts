import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcessarSintegraComponent } from './processar-sintegra.component';
import { ProcessarSintegraRoutingModule } from './processar-sintegra.routing.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelecionarPeriodosSintegraComponent } from './selecionar-periodos-sintegra/selecionar-periodos-sintegra.component';
import { GerarArqMagneticoSintegraComponent } from './gerar-arq-magnetico-sintegra/gerar-arq-magnetico-sintegra.component';
import { HistoricoGeracaoArquivosSintegraComponent } from './historico-geracao-arquivos-sintegra/historico-geracao-arquivos-sintegra.component';



@NgModule({
  declarations: [
    ProcessarSintegraComponent, SelecionarPeriodosSintegraComponent, 
    GerarArqMagneticoSintegraComponent, HistoricoGeracaoArquivosSintegraComponent
  ],
  imports: [
    CommonModule, ProcessarSintegraRoutingModule
    , BaseSharedModule,FormsModule,
    ReactiveFormsModule

  ]
})
export class ProcessarSintegraModule { }
