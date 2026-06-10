import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracoesComponent } from './configuracoes.component';
import { ConfiguracoesRoutingModule } from './configuracoes.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSharedModule } from '@base-shared/base-shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCardModule, NbDialogModule, NbTabsetModule } from '@nebular/theme';
import { LoadingV01Component } from '@base-shared/loadingv01/loaddingv01';
import { WhatsAppQrCodeModalComponent } from './whats-app-qr-code-modal/whats-app-qr-code-modal.component';
import { QRCodeModule } from 'angularx-qrcode';
import { WhatsAppEnviarArquivoModalComponent } from './whats-app-enviar-arquivo-model/whats-app-enviar-arquivo-modal.component';
import { ImportarDadosIniciaisComponent } from './importar-dados-iniciais/importar-dados-iniciais.component';


@NgModule({
  declarations: [
    ConfiguracoesComponent,
    WhatsAppQrCodeModalComponent,
    WhatsAppEnviarArquivoModalComponent,
    ImportarDadosIniciaisComponent
  ],
  imports: [
    CommonModule
    , ConfiguracoesRoutingModule
    ,CommonModule
    ,ReactiveFormsModule
    , BaseSharedModule
    , NgbModule
    ,NbDialogModule.forRoot()
     ,FormsModule
     , ReactiveFormsModule
    , NbTabsetModule
    , QRCodeModule
    


  ]
})
export class ConfiguracoesModule { }
