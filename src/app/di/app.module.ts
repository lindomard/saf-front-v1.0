import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { CnpjValidatorDirective } from '@base-core/directive/cnpj-validation.directive';
import { CpfValidatorDirective } from '@base-core/directive/cpf-validator.directive';
import { LoginGuard } from '@base-core/guard/login.guard';
import { SessionService } from '@base-core/session/session.service';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { MaterialModule } from '@base-shared/meterial/material.module';
import { ProgressBarComponent } from '@base-shared/progress-bar/progress-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ApiCreateHttpclienteService, applicationHttpClienteCreator } from '../base/base-core/build-request/api-create-httpcliente.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Formulario1Component } from '../formulario1/formulario1.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatRowKeyboardSelectionDirective } from 'src/app/mat-row-keyboard-selection/mat-row-keyboard-selection.directive';
registerLocaleData(ptBr);

ToastDefaults.toast.timeout = 3000;


@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    CpfValidatorDirective,
    CnpjValidatorDirective, Formulario1Component
  ],


  imports: [
    AppRoutingModule,
    
    BrowserAnimationsModule
    
    ,CommonModule,    
    HttpClientModule,
    SnotifyModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot([], { useHash: true, relativeLinkResolution: 'legacy' }),
    NgbModule,
    BaseSharedModule,

    
  ],
  providers: [
    {
      provide: ApiCreateHttpclienteService,
      useFactory: applicationHttpClienteCreator,
      deps: [HttpClient, SessionService, Router, SnotifyService]
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    LoginGuard,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
  exports: [BrowserAnimationsModule,NgbModule
  ,CommonModule]
})
export class AppModule { }
