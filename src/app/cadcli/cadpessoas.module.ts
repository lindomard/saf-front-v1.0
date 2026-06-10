import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadpessoasComponent } from './cadpessoas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadpessoasRoutingModule } from './cadpessoas.routing.module';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbDialogModule, NbLayoutModule, NbListModule, NbMenuModule, NbTabsetModule, NbThemeModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BaseNebularModule } from '../base/base-nebular/base-nebular.module';
import { CadpessoasMapper } from './mapper/cadpessoas-mapper';
import { CadpessoasNavbarComponent } from './cadpessoas-navbar/cadpessoas-navbar.component';



@NgModule({
  declarations: [
    CadpessoasComponent, CadpessoasNavbarComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
    , CadpessoasRoutingModule
    , BaseSharedModule
    , NgbModule
    , NbDialogModule.forRoot()
    , NbThemeModule.forRoot()
    , NbCardModule
    , NgbModule
    , FormsModule
    , ReactiveFormsModule
    , NbTabsetModule
    


  ], providers: [CadpessoasMapper]
})
export class CadpessoasModule { }
