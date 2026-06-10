import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportarPlanilhasComponent } from './importar-planilhas/importar-planilhas.component';
import { ImportarPlanilhasComponentRoutingModule } from './importar-planilhas.routing.module';
import { ConfiguracoesModule } from '../configuracoes/configuracoes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from '@home/home-routing.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSharedModule } from '@base-shared/base-shared.module';



@NgModule({
  declarations: [
    ImportarPlanilhasComponent
  ],
  imports: [
    CommonModule
    , ImportarPlanilhasComponentRoutingModule,
     

    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BaseSharedModule,

  ]
})
export class ImportarPlanilhasModule { }
