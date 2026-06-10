import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '@base-core/session/session.service';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { PlanilhasModel } from '../model/PlanilhasModel';
import { SnotifyService } from 'ng-snotify';
import { ArquivosService } from '@base-core/service/arquivos.service';
import { Response } from '@base-core/model/response.model';
import { ProgressBar } from 'src/app/arquivos/model/progressbar.model';
import * as moment from 'moment';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { ProcessarService } from 'src/app/cadcli/processar/processar.service';
import { safeCall } from '@base-core/safe-call';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';

@Component({
  selector: 'app-importar-planilhas',
  templateUrl: './importar-planilhas.component.html',
  styleUrls: ['./importar-planilhas.component.scss']
})
export class ImportarPlanilhasComponent implements OnInit {

  constructor(private session: SessionService
    , private snotifyService: SnotifyService
    , private arquivoService: ArquivosService
    , private formBuilder: FormBuilder
    , private processarService: ProcessarService
    , private baixarArquivosService: BaixarArquivosService

  ) { }

  isLoading = false;

  itemSelecionado: any;
  mDisableGerar: boolean = false;

  items = [{ name: 'Produto Por Cfop', id: 0 }, { name: 'Cadr0220 Fator Conversao', id: 1 }];
  progresso = 0;
  uploadResponse = { status: '', message: 0, filePath: '' };
  selectedItem: any;
  message: string;

  progressoSefaz = 0;
  uploadResponseSefaz = { status: '', message: 0, filePath: '' };
  filesSefaz: File[] = [];

  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  files: File[] = [];

  mDatHorInicio: Date;
  mDatHorEstimada: Date;
  mDatHorProcessada: Date;
  mDatHorRestante: Date;
  mMeensagem: string = "";
  mInicioDownload = false;
  mObsTempo: string;
  mError: boolean = false;

  mDisableButons: boolean = false;
  form: FormGroup;
  formSefaz: FormGroup;
  formData = new FormData();
  formDataSefaz = new FormData();

  mEstaProcessando: boolean = false;

  ngOnInit(): void {
    this.selectedItem = this.items[0];
    this.itemSelecionado = this.items[0].id;
    this.fCriarForm();

    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.mDisableButons = false;
        this.isLoading = false;
      }
    })


  }

  fCriarForm() {
    this.form = this.formBuilder.group({
      files: new FormControl([null], Validators.required),
      pIdPessoa: new FormControl([null], Validators.required),
      data: new FormControl([null], Validators.required),
    })

    this.formSefaz = this.formBuilder.group({
      files: new FormControl([null], Validators.required),
      pIdPessoa: new FormControl([null], Validators.required),
      data: new FormControl([null], Validators.required),
    })

  }


  selecFiles($event) {
    let planinhasModelLista: PlanilhasModel[] = [];

    let filesSelected: File[] = $event.target.files;
    for (let index = 0; index < filesSelected.length; index++) {
      let element: File = filesSelected[index];
      this.formData.append(`files`, element);
      this.files.push(element);


      let planinhasModel: PlanilhasModel = {};
      planinhasModel.nomePlanilha = element.name;
      if (this.itemSelecionado == 0) {
        planinhasModel.tipoPlanilha = "CODITEMPORCFOP_AUDITSYS";
      } else if (this.itemSelecionado == 1) {
        planinhasModel.tipoPlanilha = "CADR0220_COMPARAR";
      }
      this.items
      planinhasModel.TamanhoArquivo = element.size;

      planinhasModel.idPessoa = FuncoesGerais.toInt(this.session.companyId);

      planinhasModelLista.push(planinhasModel);

    }

    if (planinhasModelLista.length == this.files.length) {
      this.formData.append('idPessoa', this.session.companyId);
      this.formData.append('data', JSON.stringify(planinhasModelLista));
    }

  }
  // inicio 

  selecFilesSefaz($event) {
    let planinhasModelLista: PlanilhasModel[] = [];

    let filesSelected: File[] = $event.target.files;
    for (let index = 0; index < filesSelected.length; index++) {
      let element: File = filesSelected[index];
      this.formDataSefaz.append(`files`, element);
      this.filesSefaz.push(element);


      let planinhasModel: PlanilhasModel = {};
      planinhasModel.nomePlanilha = element.name;

      if (this.itemSelecionado == 0) {
        planinhasModel.tipoPlanilha = "CODITEMPORCFOP_SEFAZ";
      } else if (this.itemSelecionado == 1) {
        planinhasModel.tipoPlanilha = "CADR0220_COMPARAR";
      }
      planinhasModel.TamanhoArquivo = element.size;

      planinhasModel.idPessoa = FuncoesGerais.toInt(this.session.companyId);

      planinhasModelLista.push(planinhasModel);

    }

    if (planinhasModelLista.length == this.filesSefaz.length) {
      this.formDataSefaz.append('idPessoa', this.session.companyId);
      this.formDataSefaz.append('data', JSON.stringify(planinhasModelLista));
    }

  }


  // termino

  concluido() {
    this.mEstaProcessando = false;
    //    console.log('concluido')
  }

  removerFiles() {
    this.formData = new FormData();
    this.files = [];

    this.form.reset();
  }
  // inicio


  removerFilesSefaz() {
    this.formDataSefaz = new FormData();
    this.filesSefaz = [];

    this.formSefaz.reset();
  }

  // termino


  uploadFile() {
    if (this.files.length === 0) {
      this.snotifyService.error('Selecione o arquivo');
      return;
    }
    this.mDatHorInicio = FuncoesGerais.fPegarDataAtual();
    this.mEstaProcessando = true;
    // termino


    let response: Response;
    let pathUplod: string = 'importarPlanilhas/files';
    this.arquivoService.uploadFiles(this.formData, pathUplod).subscribe(
      (res) => {
        response = res;
        this.uploadResponse = res
        this.fCalcularTempoUpload(res);
        this.removerFiles();
      },
      (err) => {
        this.snotifyService.error(err)
        this.mError = true;
        this.mEstaProcessando = false;
        this.mMeensagem = "Erro Ao Transmitir arquivo. Feche o aplicativo e tente mais tarde!/n"
          + "Erro " + err;

      },
      () => {
        console.log('response ', response.success, ' erro ', response.error);
        if (response.success) {
          this.concluido();
        } else {
          this.mEstaProcessando = false;
          this.snotifyService.warning(response.error);

        }

      }
    )
  }

  // inicio


  uploadFileSefaz() {
    if (this.filesSefaz.length === 0) {
      this.snotifyService.error('Selecione o arquivo');
      return;
    }
    this.mDatHorInicio = FuncoesGerais.fPegarDataAtual();
    this.mEstaProcessando = true;
    // termino


    let response: Response;
    let pathUplod: string = 'importarPlanilhas/files';
    this.arquivoService.uploadFiles(this.formDataSefaz, pathUplod).subscribe(
      (res) => {
        response = res;
        this.uploadResponseSefaz = res
        this.fCalcularTempoUpload(res);
        this.removerFilesSefaz();
      },
      (err) => {
        this.snotifyService.error(err)
        this.mError = true;
        this.mEstaProcessando = false;
        this.mMeensagem = "Erro Ao Transmitir arquivo. Feche o aplicativo e tente mais tarde!/n"
          + "Erro " + err;

      },
      () => {
        console.log('response ', response.success, ' erro ', response.error);
        if (response.success) {
          this.concluido();
        } else {
          this.mEstaProcessando = false;
          this.snotifyService.warning(response.error);

        }

      }
    )
  }

  // temino

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


    this.mObsTempo = "iniciado em " + FuncoesGerais.convertDateTimeSeg(this.mDatHorInicio) + "\n";
    this.mObsTempo = this.mObsTempo + (mEstimadoms == 0 ? "" : " Tempo Estimado " + "\n"
      + mEstimadoLabel + ".");
    this.mObsTempo = this.mObsTempo + (mDecorridoms == 0 ? "" : " decorrido " + "\n"
      + mDecorridoLabel);
    this.mObsTempo = this.mObsTempo + (mRestantems == 0 ? "" : " Restante " + mRestanteLabel) + "\n";
  }



  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }

  // inicio



  fBuscarPlanilha(pUrl: string) {



    if (this.itemSelecionado == 1) {
      pUrl = "gerarPlanilhaCadr0220Comparar";
    }
    this.showLoading();
    let pNomeRel: string = "Planilhas Divergentes"


    this.mDisableButons = true;
    this.filtrosGenericosLista = [];


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "icIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = pNomeRel;
    parametrosDados.origemRelatorio = pNomeRel;

    let orderFieldsLista: OrderFields[] = [];







    this.baixarArquivosService.buscarDadosPostGenerico(parametrosDados, pUrl)
      .subscribe((Response) => {
        if (Response.success) {
          this.baixarPlanilhas(Response.objeto);
        } else {
          this.snotifyService.warning(HttpMensage(Response.error));
        }


      })
      , error => {
        this.snotifyService.error(error.error.message);
        BaixarArquivosService.terminouDownload.emit(true);

      }





  }



  baixarPlanilhas(nomeDoArquivoGeradoModel: NomeDoArquivoGeradoModel[]) {


    nomeDoArquivoGeradoModel.forEach(obj => {
      if (obj.nomeDoArquivoGerado != null && obj.nomeDoArquivoGerado.length > 0) {
        this.baixarArquivosService.downloadarquivo(obj.nomeDoArquivoGerado);

      }
      BaixarArquivosService.terminouDownload.emit(false)

    });





  }

  // termino

  onChange($event: any) {
    this.message = `onChange ${JSON.stringify($event)}`;
    console.log(JSON.stringify($event) + " valor " + JSON.stringify(this.selectedItem.name))
  }

}
