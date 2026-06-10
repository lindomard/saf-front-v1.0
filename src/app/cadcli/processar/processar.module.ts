import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessarComponent } from './processar.component';
import { ProcessarRoutingModule } from './processar.routing.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelecionarPeriodosComponent } from './selecionar-periodos/selecionar-periodos.component';
import { GerarArqMagneticoComponent } from './gerar-arq-magnetico/gerar-arq-magnetico.component';
import { HistoricoGeracaoArquivosComponent } from './historico-geracao-arquivos/historico-geracao-arquivos.component';



@NgModule({
  declarations: [
    ProcessarComponent, SelecionarPeriodosComponent, GerarArqMagneticoComponent, HistoricoGeracaoArquivosComponent
  ],
  imports: [
    CommonModule, ProcessarRoutingModule
    , BaseSharedModule,FormsModule,
    ReactiveFormsModule

  ]
})
export class ProcessarModule { }
