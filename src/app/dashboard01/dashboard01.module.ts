import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard01Component } from './dashboard01.component';
import { dashboard01RoutingModule } from './dashboard01.routing.module';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { BaseSharedModule } from '@base-shared/base-shared.module';

import { PieChartComponent } from './piechart/piechart';
import { NgChartsModule } from 'ng2-charts';
import { MessageService } from '../websocket/message.service';
import { ProcessosExecutadosComponent } from './processos-executados/processos-executados.component';
import { ApiService } from './processos-executados/model/api.service';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadlogModule } from '../cadlog/cadlog.module';



@NgModule({
    declarations: [
        Dashboard01Component, PieChartComponent,ProcessosExecutadosComponent
    ],
    exports: [Dashboard01Component],
    providers: [BaixarArquivosService, MessageService, ApiService],
    imports: [
        CommonModule,
        dashboard01RoutingModule,
        BaseSharedModule, NgChartsModule
        ,MaterialModule,
        FormsModule,
        ReactiveFormsModule
        ,CadlogModule        
    ]
})
export class Dashboard01Module { }
