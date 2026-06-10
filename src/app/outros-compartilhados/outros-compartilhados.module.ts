import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FiltrosCustomizadosComponent } from './filtros-customizados/filtros-customizados.component';
import { ConfigTableModalComponent } from './config-table/config-table-modal.component';



@NgModule({
  declarations: [FiltrosCustomizadosComponent, ConfigTableModalComponent
  ],
  imports: [

    CommonModule,
      
     BaseSharedModule,
    ReactiveFormsModule,
    FormsModule
    , CurrencyMaskModule
    

  ]
  ,
  exports: [
    FiltrosCustomizadosComponent
    
        
  ]  
})
export class OutrosCompartilhadosModule { }
