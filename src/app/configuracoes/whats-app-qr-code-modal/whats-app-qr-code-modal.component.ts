import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfiguracoesService } from '../configuracoes.service';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-whats-app-qr-code-modal',
  templateUrl: './whats-app-qr-code-modal.component.html',
  styleUrls: ['./whats-app-qr-code-modal.component.scss']
})
export class WhatsAppQrCodeModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WhatsAppQrCodeModalComponent>
    , @Inject(MAT_DIALOG_DATA) public dados: any,
    private configuracoesService: ConfiguracoesService
    , private snotifyService: SnotifyService

  ) { 
    dialogRef.disableClose = true;


  }

  isLoading: boolean = false;
  timer: number;
  mCancelouProcessamento: boolean = false;
  mSessionId: string = "";
  mTipoOperacao: string;
  stringQrCode: string = "teste";
  rxjsTimer = timer(1000, 1000);

  mGerouQrCode: boolean = false;
  destroy = new Subject();

  ngOnInit(): void {
    this.setup();
  }


  cancelarESair() {
    this.mCancelouProcessamento = true;
    this.dialogRef.close();

  }

  setup() {
    this.mGerouQrCode = false;    
    this.mCancelouProcessamento = false;

    this.mSessionId = this.dados.idSessao;

    this.mTipoOperacao = "Conectando a Sessao: " + this.mSessionId;
    this.stringQrCode = this.dados.stringQrCode;
    //    this.whatsAppQrCode();

    this.fEsperarLeitura(50);




  }

  fEsperarLeitura(pQtdSeg: number) {
    this.timer = 0;
    console.log('entrou no esperar leitura' + FuncoesGerais.convertDateTimeSeg(new Date()));
    this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
      this.timer = val;
      this.whatsAppEstaConectado();
      if (this.mGerouQrCode ||


        this.timer >= pQtdSeg || this.mCancelouProcessamento) {


        this.destroy.next();
        this.destroy.complete();

        this.dialogRef.close();
      }

    })
  }


  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  /*
    whatsAppQrCode() {
  
  
      try {
        this.showLoading();
    
        this.configuracoesService.WhatsAppQrCodeText(this.mSessionId).subscribe((WhatsAppQrCodeTextResponseModel) => {
          safeCall(WhatsAppQrCodeTextResponseModel, () => {
    
  //          this.formulario.get("resultados").setValue(JSON.stringify(WhatsAppQrCodeTextResponseModel));
    
            if (WhatsAppQrCodeTextResponseModel.success) {
              this.stringQrCode = WhatsAppQrCodeTextResponseModel.qr;
               this.fEsperarLeitura(50);
    
            } else {
              this.snotifyService.info("Erro ao Gerar QrCode!" + WhatsAppQrCodeTextResponseModel.qr) ;
    
            }
    
          })
        }, error => {
          this.snotifyService.error(error.error.message);
        }
    
    
    
        );
      } catch (error) {
        this.snotifyService.error(error);
    
      } finally {
        this.hideLoading();
    
      }
    }
    
  */

  whatsAppEstaConectado() {


    try {

      this.configuracoesService.WhatsAppStatusSession(this.mSessionId).subscribe((WhatsAppResponseModel) => {


        safeCallOrNull(WhatsAppResponseModel, (it) => {

          if (it.success) {
            this.mGerouQrCode = true;
            console.log('saindo verdadeiro ', it.success )
          } else {

          }
        }, () => {
        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      return 

    }
  }


}
