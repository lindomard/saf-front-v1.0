import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { WhatsAppEnviarArquivo } from '../model/WhatsAppEnviarArquivo';
import { SessionService } from '@base-core/session/session.service';
import { SnotifyService } from 'ng-snotify';
import { ConfiguracoesService } from '../configuracoes.service';
import { ProgressBar } from 'src/app/arquivos/model/progressbar.model';
import * as moment from 'moment';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ArquivosService } from '@base-core/service/arquivos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { tryCatch } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-whats-app-enviar-arquivo-modal',
  templateUrl: './whats-app-enviar-arquivo-modal.component.html',
  styleUrls: ['./whats-app-enviar-arquivo-modal.component.scss']
})
export class WhatsAppEnviarArquivoModalComponent implements OnInit {

  constructor(private session: SessionService
    , private snotifyService: SnotifyService
    , private arquivoService: ArquivosService
    , public dialogRef: MatDialogRef<WhatsAppEnviarArquivoModalComponent>
    , @Inject(MAT_DIALOG_DATA) public dados: any
    , private formBuilder: UntypedFormBuilder

  ) { dialogRef.disableClose = true; }


  mTipoOperacao: string = "Enviar Arquivos";
  uploadResponse: any;
//  uploadResponse = { status: '', message: 0, filePath: '' };
  isLoading: boolean = false;
  form: UntypedFormGroup;
  formData = new FormData();
  mObsTempo: string;
  files: File[] = [];
  mIdPessoa: string = "";
  mSessionId: string = "";

  foneDestinoTratado: string = "";


  mDatHorInicio: Date;
  mDatHorEstimada: Date;
  mDatHorProcessada: Date;
  mDatHorRestante: Date;

  mError: boolean = false;
  mMeensagem: string = "";

  mCancelouProcessamento: boolean = false;
  mEstaProcessando: boolean = false;
  whatsAppEnviarArquivoLista: WhatsAppEnviarArquivo[] = [];
  ngOnInit(): void {
    this.setup();
  }

  cancelarESair() {
    this.mCancelouProcessamento = true;
    this.dialogRef.close();

  }

  setup() {

    this.form = this.formBuilder.group({
      files: new UntypedFormControl([null], Validators.required),
      pIdPessoa: new UntypedFormControl([null], Validators.required),
      data: new UntypedFormControl([null], Validators.required),
    })

    this.mEstaProcessando = false;    
    this.mCancelouProcessamento = false;

    this.mSessionId = this.dados.idSessao;
    this.mIdPessoa = this.dados.idPessoa;
    this.foneDestinoTratado = this.dados.foneDestinoTratado;

    this.mTipoOperacao = "Enviar Arquivos. Conectado a Sessao: " + this.mSessionId;
  }


  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  selecFiles($event) {
    let filesSelected: File[] = $event.target.files;
    for (let index = 0; index < filesSelected.length; index++) {
      let element: File = filesSelected[index];
      this.formData.append(`files`, element);
      this.files.push(element);
      let whatsAppEnviarArquivo: WhatsAppEnviarArquivo = {};
      whatsAppEnviarArquivo.nomeArquivo = element.name;
      this.mIdPessoa = this.session.companyId;

      whatsAppEnviarArquivo.idPessoa = this.mIdPessoa;
      whatsAppEnviarArquivo.tamanhoArquivo = element.size;
      whatsAppEnviarArquivo.foneDest = this.foneDestinoTratado;
      whatsAppEnviarArquivo.status = 0;
      whatsAppEnviarArquivo.sessionId = this.mSessionId;
      whatsAppEnviarArquivo.extensaoArq = "txt";


      this.whatsAppEnviarArquivoLista.push(whatsAppEnviarArquivo);

    }

    if (this.whatsAppEnviarArquivoLista.length == this.files.length) {
      this.formData.append('pIdPessoa', this.mIdPessoa.toString());
      this.formData.append('data', JSON.stringify(this.whatsAppEnviarArquivoLista));
    }

  }


  removerFiles() {
    this.formData = new FormData();
    this.files = [];
    this.whatsAppEnviarArquivoLista = [];
    this.form.reset();
  }


  fCalcularTempoUpload(progressBar: ProgressBar) {

    this.mDatHorProcessada = new Date();

    var mDecorridoms = moment(this.mDatHorProcessada, "DD/MM/YYYY HH:mm:ss").diff(moment(this.mDatHorInicio, "DD/MM/YYYY HH:mm:ss"));
    var mDecorridoHoras = moment.duration(mDecorridoms);
    var mDecorridoLabel = Math.floor(mDecorridoHoras.asHours()) + "h" + moment.utc(mDecorridoms).format("mm:ss") + " minutos/segundos";

    var mEstimadoms = (mDecorridoms / progressBar.message) * 100;
    var mEstimadoHoras = moment.duration(mEstimadoms);
    var mEstimadoLabel = Math.floor(mEstimadoHoras.asHours()) + "h" + moment.utc(mEstimadoms).format("mm:ss") + " minutos/segundos";


    var mRestantems = mEstimadoms - mDecorridoms;
    var mRestanteHoras = moment.duration(mRestantems);
    var mRestanteLabel = Math.floor(mRestanteHoras.asHours()) + "h" + moment.utc(mRestantems).format("mm:ss") + " minutos/segundos";



    this.mObsTempo = "iniciado em " + FuncoesGerais.convertDateTimeSeg(this.mDatHorInicio) + "\n";
    this.mObsTempo = this.mObsTempo + (mEstimadoms == 0 ? "" : " Tempo Estimado " + "\n"
      + mEstimadoLabel + ".");
    this.mObsTempo = this.mObsTempo + (mDecorridoms == 0 ? "" : " decorrido " + "\n"
      + mDecorridoLabel);
    this.mObsTempo = this.mObsTempo + (mRestantems == 0 ? "" : " Restante " + mRestanteLabel) + "\n";
  }







  uploadFile() {
    if (this.files.length === 0) {
      this.snotifyService.error('Selecione o arquivo');
      return;
    }
    this.mEstaProcessando = true;
    this.mDatHorInicio = new Date();
    // termino


    let pathUplod: string = "whatsAppSendFiles/files";
  
    try {
      
    this.arquivoService.uploadFiles(this.formData,pathUplod).subscribe(
      (res) => {
//        console.log('res ', res);
  //      console.log('json res ', JSON.stringify(res));

        this.uploadResponse = res
        this.fCalcularTempoUpload(res);
        this.removerFiles();
      },
      (err) => {

        this.snotifyService.error(HttpMensage(err))
        this.mError = true;
        this.mMeensagem = "Erro Ao Transmitir arquivo. Feche o aplicativo e tente mais tarde!/n"
          + "Erro " + err;


      },
      () => {

        this.mEstaProcessando = false;
        if (this.uploadResponse.error) {
//          this.snotifyService.error(this.uploadResponse.message);
          this.snotifyService.error(HttpMensage(this.uploadResponse));
          this.mCancelouProcessamento = true;
        } else {
          this.snotifyService.info(HttpMensage(this.uploadResponse));
          this.mCancelouProcessamento = false;
  
        }
        console.log('199 acionou concluido ')
        this.dialogRef.close()

      }
    )
  } catch (error) {
      
    console.log('202 deu erro ')
  } finally {
    console.log('204 terminou ')
    this.mEstaProcessando = false;

  }

  }

}
