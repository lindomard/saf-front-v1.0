import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DadosComunRoutingModule } from './dados-comuns.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { OrdemCamposComponent } from './ordem-campos/ordem-campos.component';
import { ConfigRelatorioComponent } from './config-relatorio/config-relatorio.component';
import { RelatoriosPlanilhasComponent } from './relatorios-planilhas/relatorios-planilhas.component';
import { ConfigDadosTabelaConsultaComponent } from './config-dados-tabela-consulta/config-dados-tabela-consulta.component';
import { PesquisarPorComponent } from './pesquisar-por/pesquisar-por.component';
import { ConsultasERelatoriosComponent } from './consultas-e-relatorios/consultas-e-relatorios.component';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FiltrosPesquisaModalComponent } from './filtros-pesquisa-modal/filtros-pesquisa-modal.component';
import { ConfigTableComponent } from './config-table/config-table.component';
import { ConfigPesquisarPorComponent } from './config-pesquisar-por/config-pesquisar-por.component';
import { ConfigOrdemResultModalComponent } from './config-ordem-rel-result-modal/config-ordem-rel-result-modalcomponent';



@NgModule({
  declarations: [
    OrdemCamposComponent,
    ConfigRelatorioComponent,
    RelatoriosPlanilhasComponent,
    ConfigDadosTabelaConsultaComponent,
    
    ConsultasERelatoriosComponent,
    ConfigOrdemResultModalComponent,PesquisarPorComponent
    ,FiltrosPesquisaModalComponent, ConfigTableComponent, ConfigPesquisarPorComponent
  ],
  imports: [
     FormsModule, ReactiveFormsModule,DadosComunRoutingModule,NgForOf,CommonModule
     
     , BaseSharedModule,MaterialModule

  ],
  exports: [
    OrdemCamposComponent,ConfigRelatorioComponent,RelatoriosPlanilhasComponent
    ,ConfigDadosTabelaConsultaComponent, ConsultasERelatoriosComponent
   
  ]

})
export class DadosComunModule { }
