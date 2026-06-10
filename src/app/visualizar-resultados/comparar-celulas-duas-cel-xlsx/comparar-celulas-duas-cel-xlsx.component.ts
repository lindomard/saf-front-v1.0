import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompararCelulasDe2XlsModel } from '../model/CompararCelulasDe2XlsModel';
import { SnotifyService } from 'ng-snotify';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ArquivosService } from '@base-core/service/arquivos.service';
import { ProgressBar } from 'src/app/arquivos/model/progressbar.model';
import * as moment from 'moment';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { SessionService } from '@base-core/session/session.service';

@Component({
  selector: 'app-comparar-celulas-duas-cel-xlsx',
  templateUrl: './comparar-celulas-duas-cel-xlsx.component.html',
  styleUrls: ['./comparar-celulas-duas-cel-xlsx.component.scss']
})
export class CompararCelulasDuasCelXlsxComponent implements OnInit {


  progresso = 0;
  uploadResponse = { status: '', message: 0, filePath: '' };
  mObsTempo: string;

  mDatHorInicio: Date;
  mDatHorEstimada: Date;
  mDatHorProcessada: Date;
  mDatHorRestante: Date;
  mMeensagem: string = "";
  mInicioDownload = false;
  mError: boolean = false;
  mTextoRetorno: string = "";
  mDisableButons: boolean = false;



  ListaCompararCelulasDe2XlsModel: CompararCelulasDe2XlsModel[] = [];
  form: FormGroup;
  formData = new FormData();
  mEstaProcessando: boolean = false;
  files: File[] = [];

  constructor(private formBuilder: FormBuilder
    , private snotifyService: SnotifyService
    , private arquivoService: ArquivosService
    


  ) { }

  ngOnInit(): void {
    this.fCriarForm();
  }



  selecFiles($event) {
    let filesSelected: File[] = $event.target.files;
    for (let index = 0; index < filesSelected.length; index++) {
      let element: File = filesSelected[index];
      this.formData.append(`files`, element);
      this.files.push(element);
      let compararCelulasDe2XlsModel: CompararCelulasDe2XlsModel = {};
      compararCelulasDe2XlsModel.nomeOrigem = element.name;
      compararCelulasDe2XlsModel.arquivoNome = element.name;
      compararCelulasDe2XlsModel.colTab01 = this.form.get("colTab01").value;
      compararCelulasDe2XlsModel.colTab02 = this.form.get("colTab02").value;

      this.ListaCompararCelulasDe2XlsModel.push(compararCelulasDe2XlsModel);


    }


  }

  fCriarForm() {
    this.form = this.formBuilder.group({
      files: new FormControl([null], Validators.required),
      colTab01: new FormControl(3, Validators.required),
      colTab02: new FormControl(4, Validators.required)
    })
  }

  removerFiles() {
    this.formData = new FormData();
    this.files = [];
    this.ListaCompararCelulasDe2XlsModel = [];

    this.form.reset();
    this.form.get("colTab01").setValue(3);
    this.form.get("colTab02").setValue(4);   
    this.mEstaProcessando  = false;
  }

  uploadFile() {
    if (this.files.length === 0) {
      this.snotifyService.error('Selecione o arquivo');
      return;
    }
    this.mDatHorInicio = FuncoesGerais.fPegarDataAtual();
    this.mEstaProcessando = true;
    // termino

    if (this.ListaCompararCelulasDe2XlsModel.length == this.files.length) {
      this.formData.append('data', JSON.stringify(this.ListaCompararCelulasDe2XlsModel));
    }


    let pathUplod: string = 'compararCelulasDe2Xlsx/files';
    this.arquivoService.uploadFiles(this.formData, pathUplod).subscribe(
      (res) => {
        this.uploadResponse = res
        this.fCalcularTempoUpload(res);

        this.mTextoRetorno = res.success;
        this.removerFiles();
      },
      (err) => {
        this.snotifyService.error(HttpMensage(err))
        this.mError = true;
        this.mEstaProcessando = false;
//        this.mMeensagem = "Erro Ao Transmitir arquivo. Feche o aplicativo e tente mais tarde!/n"
//          + "Erro " + err;

      },
      () => {
        // this.fIrParaDashboard01();

      }
    )
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