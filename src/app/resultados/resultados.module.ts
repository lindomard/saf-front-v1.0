import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { EfdSemXmlModalComponent } from './efd-sem-xml-modal/efd-sem-xml-modal.component';
import { ResultadosRoutingModule } from './resultados.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';



@NgModule({
  declarations: [
    EfdSemXmlModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ResultadosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BaseSharedModule




     

   

  ], providers: [BaixarArquivosService]
})
export class ResultadosModule { }
