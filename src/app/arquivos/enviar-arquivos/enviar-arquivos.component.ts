import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { ArquivosService } from '@base-core/service/arquivos.service';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { SnotifyService } from 'ng-snotify';
import { ProgressBar } from '../model/progressbar.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CadpessoasDocModel } from '../model/cadpessoas-doc-model';
import { SessionService } from '@base-core/session/session.service';

@Component({
  selector: 'app-enviar-arquivos',
  templateUrl: './enviar-arquivos.component.html',
  styleUrls: ['./enviar-arquivos.component.scss']
})
export class EnviarArquivosComponent implements OnInit {

  constructor(
    private snotifyService: SnotifyService,
    private arquivoService: ArquivosService
    , private router: Router
    , private formBuilder: UntypedFormBuilder
    , private session: SessionService

  ) { }

  progressBar: ProgressBar = { status: '', message: 0, filePath: '' };



  uploadResponse = { status: '', message: 0, filePath: '' };
  form: UntypedFormGroup;
  formData = new FormData();
  ListaCadpessoasDocModel: CadpessoasDocModel[] = [];

  mEstaProcessando: boolean = false;
  mIdPessoa: any;
  mObsTempo: string;
  files: File[] = [];
  mDatHorInicio: Date;
  mDatHorEstimada: Date;
  mDatHorProcessada: Date;
  mDatHorRestante: Date;
  mError: boolean = false;
  mMeensagem: string = "";
  mInicioDownload = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      files: new UntypedFormControl([null], Validators.required),
      pIdPessoa: new UntypedFormControl([null], Validators.required),
      data: new UntypedFormControl([null], Validators.required),
      dataExcluidos: new UntypedFormControl([null], Validators.required),
    })

  }


  selecFiles($event) {
    let filesSelected: File[] = $event.target.files;
    for (let index = 0; index < filesSelected.length; index++) {
      let element: File = filesSelected[index];
      this.formData.append(`files`, element);
      this.files.push(element);
      let cadpessoasDocModel: CadpessoasDocModel = {};
      cadpessoasDocModel.pdNome = element.name;
      cadpessoasDocModel.pdArquivoNome = element.name;
      this.mIdPessoa = this.session.companyId;

      cadpessoasDocModel.pdIdPessoa = this.mIdPessoa;
      cadpessoasDocModel.pdEvalido = "S";
      cadpessoasDocModel.pdOrigemArquivo = "Front";
      cadpessoasDocModel.pdObs = "Enviado Pelo Saf v01.0";
      cadpessoasDocModel.pdTamanhoArquivo = element.size;




      cadpessoasDocModel.pdInventario = 0;
      cadpessoasDocModel.pdIntNumdoc = 0;
      cadpessoasDocModel.pdCodprocvinculado = 0;

      cadpessoasDocModel.pdStatus = 0;
      cadpessoasDocModel.pdIntVlDoc = 0;
      cadpessoasDocModel.pdLoteAvaliacao = 0;


      this.ListaCadpessoasDocModel.push(cadpessoasDocModel);


    }

    if (this.ListaCadpessoasDocModel.length == this.files.length) {
      this.formData.append('pIdPessoa', this.mIdPessoa.toString());
      this.formData.append('data', JSON.stringify(this.ListaCadpessoasDocModel));
      this.formData.append('dataExcluidos', '[]');
    }

  }

  removerFiles() {
    this.formData = new FormData();
    this.files = [];
    this.ListaCadpessoasDocModel = [];

    this.form.reset();
  }

  uploadFile() {
    if (this.files.length === 0) {
      this.snotifyService.error('Selecione o arquivo');
      return;
    }
    this.mDatHorInicio = FuncoesGerais.fPegarDataAtual();
    this.mEstaProcessando = true;
    // termino


    let pathUplod: string = 'cadpessoas/files';
    this.arquivoService.uploadFiles(this.formData, pathUplod).subscribe(
      (res) => {
        this.uploadResponse = res
        this.fCalcularTempoUpload(res);

        this.removerFiles();
      },
      (err) => {
        this.snotifyService.error(err)
        this.mError = true;
        this.mMeensagem = "Erro Ao Transmitir arquivo. Feche o aplicativo e tente mais tarde!/n"
          + "Erro " + err;

      },
      () => {
        this.fIrParaDashboard01();

      }
    )
  }


  fIrParaDashboard01() {
    this.router.navigate(['/page/dasdboard01']);
    //    http://localhost:4225/#/page/dasdboard01
    //this.router.navigate(['/page/dasdboard01']);

  }
  fCalcularTempoUpload(progressBar: ProgressBar) {

    this.mDatHorProcessada = FuncoesGerais.fPegarDataAtual();

    var mDecorridoms = moment(this.mDatHorProcessada, "DD/MM/YYYY HH:mm:ss").diff(moment(this.mDatHorInicio, "DD/MM/YYYY HH:mm:ss"));
    var mDecorridoHoras = moment.duration(mDecorridoms);
    var mDecorridoLabel = Math.floor(mDecorridoHoras.asHours()) + "h" + moment.utc(mDecorridoms).format("mm:ss") + " minutos/segundos";

    var mEstimadoms = (mDecorridoms / progressBar.message) * 100;
    var mEstimadoHoras = moment.duration(mEstimadoms);
    var mEstimadoLabel = Math.floor(mEstimadoHoras.asHours()) + "h" + moment.utc(mEstimadoms).format("mm:ss") + " minutos/segundos";


    var mRestantems = mEstimadoms - mDecorridoms;
    var mRestanteHoras = moment.duration(mRestantems);
    var mRestanteLabel = Math.floor(mRestanteHoras.asHours()) + "h" + moment.utc(mRestantems).format("mm:ss") + " minutos/segundos";



    //    console.log('inicio ', this.mDatHorInicio, 'termino ',
    //      this.mDatHorProcessada, ' Decorrido ', mDecorridoLabel);
    this.mObsTempo = "iniciado em " + FuncoesGerais.convertDateTimeSeg(this.mDatHorInicio) + "\n";
    this.mObsTempo = this.mObsTempo + (mEstimadoms == 0 ? "" : " Tempo Estimado " + "\n"
      + mEstimadoLabel + ".");
    this.mObsTempo = this.mObsTempo + (mDecorridoms == 0 ? "" : " decorrido " + "\n"
      + mDecorridoLabel);
    this.mObsTempo = this.mObsTempo + (mRestantems == 0 ? "" : " Restante " + mRestanteLabel) + "\n";
  }




}
