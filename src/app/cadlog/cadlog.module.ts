import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadlogExcessoesComponent } from './cadlog-excessoes/cadlog-excessoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { CadlogExcessoesService } from './cadlog-excessoes.service';



@NgModule({
  declarations: [
    CadlogExcessoesComponent
  ],
  imports: [
    CommonModule
    , ReactiveFormsModule
    , FormsModule
    , BaseSharedModule
    , MaterialModule

  ],
  providers: [CadlogExcessoesService]
})
export class CadlogModule { }
