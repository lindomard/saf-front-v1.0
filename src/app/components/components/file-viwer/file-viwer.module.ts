import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { FileViwerRoutingModule } from './file-viwer.routing.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { FileViwerComponent } from './file-viwer.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxDocViewerModule } from 'ngx-doc-viewer';



@NgModule({
  declarations: [FileViwerComponent],
  imports: [
    CommonModule
    , ReactiveFormsModule
    , FormsModule
    , ReactiveFormsModule
    , BaseSharedModule
    , FileViwerRoutingModule
    , MaterialModule
    , NgxDocViewerModule


  ]
})
export class FileViwerModule { }
