
import { Component, OnInit, ViewChild } from '@angular/core';
import { slideInAnimation } from '@base-core/animation/slide-animation';
import { OpenConnectorUseCase } from '@sign/domain/usecase/open-connector-usecase';
import { OpenConnectorSuccessState, OpenConnectorErrorState } from '@sign/domain/state/state-connector';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { HomePageService } from './home-page.service';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { CaddocResumidoModel } from '@home/model/CaddocResumidoModel';
import { SnotifyService } from 'ng-snotify';
import { MatTableDataSource } from '@angular/material/table';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { MatPaginator } from '@angular/material/paginator';
import { SessionService } from '@base-core/session/session.service';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { CadsitdocResumidoModel } from '@home/model/CadsitdocResumidoModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadpessoasDocModel } from 'src/app/arquivos/model/cadpessoas-doc-model';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ArquivosService } from '@base-core/service/arquivos.service';
import { ProgressBar } from 'src/app/arquivos/model/progressbar.model';
import * as moment from 'moment';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { environment } from 'src/environments/environment';
import { VerificaFiltrosVazio } from '@base-shared/funcoesGerais/verificaFiltrosVazio';
import { Dasboard01Service } from 'src/app/dashboard01/dashboard01.service';
import { Dashboard01Model } from 'src/app/dashboard01/model/dashboard01Model';
import { MatDialog } from '@angular/material/dialog';
import { EfdSemXmlModalComponent } from 'src/app/resultados/efd-sem-xml-modal/efd-sem-xml-modal.component';
import { CadlogExcessoesComponent } from 'src/app/cadlog/cadlog-excessoes/cadlog-excessoes.component';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { VisualizarResultadosService } from 'src/app/visualizar-resultados/visualizar-resultados.service';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { Response } from '@base-core/model/response.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [slideInAnimation]
})
export class HomePageComponent implements OnInit {

  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;

  @ViewChild(MatPaginator) paginatorPageSizeSit: MatPaginator;

  isLoading = false;

  buttonErros: string = "Impedimento";
  buttonAdvertencia: string = "Advertencias";
  mArquivosOk: boolean = false;
  mArquivosOkSemInvFinal: boolean = false;

  constructor(private openConnectorUseCase: OpenConnectorUseCase
    , private homePageService: HomePageService
    , private snotifyService: SnotifyService
    , private session: SessionService
    , private arquivoService: ArquivosService
    , private formBuilder: FormBuilder
    , public dialog: MatDialog
    // da importação inicio    
    , private api: ApiCreateHttpclienteService
    , private dasboard01Service: Dasboard01Service

    , private baixarArquivosService: BaixarArquivosService
    , private visualizarResultadosservice: VisualizarResultadosService




  ) { }
  // da importacao dos registros inicio
  private webSocketConnector: WebSocketConnector;
  data: any[] = [];
  mGerarPlanilha: boolean = false;
  mProcessando: boolean = false;
  mQtdNotificacao: number = 0;
  filtrosGenericosLista: FiltrosGenericosModel[] = [];


  // da importacao dos registros termino


  // upload inicio  

  //  mEstaProcessando = true;

  //progressVisible = false;
  progresso = 0;
  uploadResponse = { status: '', message: 0, filePath: '' };
  form: FormGroup;
  formData = new FormData();
  mEstaProcessando: boolean = false;

  ListaCadpessoasDocModel: CadpessoasDocModel[] = [];
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

  // upload termino


  filterPaginatorSit: FilterPaginator = {};
  pageLimitOptionsSit: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSizeSit = new MatTableDataSource<CadsitdocResumidoModel>([]);
  displayedColumnsSit: string[] = ['sdrId', 'sdrMesAno', 'sdrSituacao', 'button']
  captionColumnsSit: fieldsProperties[] = [
    { caption: 'Chave Id', weight: 9, mask: '', align: 'center', name: 'sdrId' },
    { caption: 'Ano e Mes', weight: 15, mask: '', align: 'center', name: 'sdrMesAno' },
    { caption: 'Situacao', weight: 66, mask: '', align: 'center', name: 'sdrSituacao' },
    { caption: 'Erros', weight: 10, mask: '', align: 'center', name: 'button' },
  ]



  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 3, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<CaddocResumidoModel>([]);
  displayedColumns: string[] = ['cdrId', 'cdrNomeDoc', 'cdrRequerInv', 'cdrAnoMesDoc'
    , 'cdrQtdArqEsp'
    , 'cdrQtdArqRec'
    , 'cdrQtdArqVal'
    , 'cdrQtdRegEsp'
    , 'cdrQtdRegRec'
    , 'cdrQtdRegVal'
    , 'cdrDocComInv']

  //    { caption: 'Ano e Mes', weight: 15, mask: 'anoMesExt', align: 'center', name: 'cdrAnoMesDoc' },

  captionColumns: fieldsProperties[] = [
    { caption: 'Chave Id', weight: 8, mask: '', align: 'center', name: 'cdrId' },
    { caption: 'Nome Documento', weight: 22, mask: '', align: 'center', name: 'cdrNomeDoc' },
    { caption: 'c/Inv', weight: 8, mask: 'valorboolean', align: 'center', name: 'cdrRequerInv' },
    { caption: 'Ano e Mes', weight: 15, mask: '', align: 'center', name: 'cdrAnoMesDoc' },
    { caption: 'Qtd Arq Esperado', weight: 8, mask: '', align: 'center', name: 'cdrQtdArqEsp' },
    { caption: 'Qtd Arq Recebido', weight: 8, mask: '', align: 'center', name: 'cdrQtdArqRec' },
    { caption: 'Qtd Arq Validos', weight: 8, mask: '', align: 'center', name: 'cdrQtdArqVal' },
    { caption: 'Qtd Reg Esperado', weight: 8, mask: '', align: 'center', name: 'cdrQtdRegEsp' },
    { caption: 'Qtd Reg Recebido', weight: 8, mask: '', align: 'center', name: 'cdrQtdRegRec' },
    { caption: 'Qtd Reg Validos', weight: 8, mask: '', align: 'center', name: 'cdrQtdRegVal' },
    { caption: 'Com Inventario', weight: 8, mask: 'valorboolean', align: 'center', name: 'cdrDocComInv' }
  ]


  titulo = "Resumo Mensal das Informações Gerais do relatorio";
  intervalo;

  /*
    colunasNovas = ['nome', 'endereco', 'cidade', 'uf'];
  
  

  
  
  dadosTabela1 = [
    { id: 1, nome: 'João', endereco: 'Rua ABC', cidade: 'São Paulo', uf: 'SP' },
    { id: 2, nome: 'Maria', endereco: 'Rua DEF', cidade: 'Rio de Janeiro', uf: 'RJ' },
    { id: 3, nome: 'Pedro', endereco: 'Rua GHI', cidade: 'Brasília', uf: 'DF' },
  ];

  dadosTabela2 = [
    { id: 1, produto: 'Produto 1', descricao: 'Descrição 1', preco: 'R$ 10,00' },
    { id: 2, produto: 'Produto 2', descricao: 'Descrição 2', preco: 'R$ 20,00' },
    { id: 3, produto: 'Produto 3', descricao: 'Descrição 3', preco: 'R$ 30,00' },
  ];


  dataSourceTabela1 = new MatTableDataSource(this.dadosTabela1);
  dataSourceTabela2 = new MatTableDataSource(this.dadosTabela2);
  colunasTabela1 = ['nome', 'endereco', 'cidade', 'uf'];
  colunasTabela2 = ['produto', 'descricao', 'preco'];
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  @ViewChild('paginatorTabela1') paginatorTabela1: MatPaginator;
  @ViewChild('paginatorTabela2') paginatorTabela2: MatPaginator;
  dados = [
    { nome: 'João', endereco: 'Rua ABC', cidade: 'São Paulo', uf: 'SP' },
    { nome: 'Maria', endereco: 'Rua DEF', cidade: 'Rio de Janeiro', uf: 'RJ' },
    { nome: 'Pedro', endereco: 'Rua GHI', cidade: 'Brasília', uf: 'DF' }
  ];

  dataSource = new MatTableDataSource(this.dados);
  colunas = ['nome', 'endereco', 'cidade', 'uf'];

    this.dataSourceTabela1.paginator = this.paginatorTabela1;
    this.dataSourceTabela2.paginator = this.paginatorTabela2;

*/



  ngOnInit() {
    //    this.initialazerConnector();


    this.filterPaginator.size = 5;
    this.filterPaginator.page = 0;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;


    this.filterPaginatorSit.size = 5;
    this.filterPaginatorSit.page = 0;
    this.filterPaginatorSit.totalElements = 0;
    this.filterPaginatorSit.totalPages = 0;
    this.dataSourceWithPageSizeSit.paginator = this.paginatorPageSizeSit;


    this.buscarCaddocResumido();
    this.buscarCadSitdocResumido();
    this.verificaProcessosPendentes();
    this.fCriarForm();


    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.mDisableButons = false;
        this.isLoading = false;
      }
    })






  }

  /*  
    setMyStyle() {
      let styles = {
        'background': '#eb01a5',
        'background-image': 'url("assets/image/auditsys_com_computador_nome_errado.jpg")'
      };
      return styles;
    }
  
  
    private initialazerConnector() {
      /*
      this.openConnectorUseCase.execute()
        .subscribe(state => {
          switch (state.constructor) {
            case OpenConnectorSuccessState: {
              const response = (state as OpenConnectorSuccessState).response;
              break;
            }
            default: {
              const response = (state as OpenConnectorErrorState).response;
              break;
            }
          }
        });
    }
  */

  imprimir() {
    window.print();
  }


  atualizar() {
    // Lógica para atualizar os dados
    console.log('Atualizando dados...');
  }


  buscarCaddocResumido() {

    // inicio

    let filtrosGenericosLista: FiltrosGenericosModel[] = [];
    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "cdrIdPessoa", "=",
      this.session.companyId.toString(), 0, " and ").adicionarfiltros();

    // inicio
    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = filtrosGenericosLista;

    parametrosDados.size = this.filterPaginator.size;
    parametrosDados.page = this.filterPaginator.page;
    this.homePageService.caddocResumidoGetList(parametrosDados).subscribe((Response) => {


      safeCall(Response.objeto, (caddocResumidoModel) => {

        this.dataSourceWithPageSize.data = [...caddocResumidoModel.content];
        this.filterPaginator.page = caddocResumidoModel.pageable.pageNumber;
        this.filterPaginator.size = caddocResumidoModel.pageable.pageSize;
        this.filterPaginator.totalElements = caddocResumidoModel.totalElements;
        this.filterPaginator.totalPages = caddocResumidoModel.totalPages;


      })

    }, error => {
      this.snotifyService.error(HttpMensage(error));
    }
    )

    // termino

  }

  // sit

  buscarCadSitdocResumido() {

    // inicio
    this.mArquivosOk = false;
    this.mArquivosOkSemInvFinal = false;


    let filtrosGenericosLista: FiltrosGenericosModel[] = [];

    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "cdrIdPessoa", "=",
      this.session.companyId.toString(), 0, " and ").adicionarfiltros();




    // inicio
    let parametrosDadosSit: ParametrosDados = {};
    parametrosDadosSit.filtrosGenericosList = filtrosGenericosLista;

    parametrosDadosSit.size = this.filterPaginatorSit.size;
    parametrosDadosSit.page = this.filterPaginatorSit.page;
    this.homePageService.cadSitdocResumidoGetList(parametrosDadosSit).subscribe((Response) => {


      safeCall(Response.objeto, (cadsitdocResumidoModel) => {

        this.dataSourceWithPageSizeSit.data = [...cadsitdocResumidoModel.content];

        this.filterPaginatorSit.page = cadsitdocResumidoModel.pageable.pageNumber;
        this.filterPaginatorSit.size = cadsitdocResumidoModel.pageable.pageSize;
        this.filterPaginatorSit.totalElements = cadsitdocResumidoModel.totalElements;
        this.filterPaginatorSit.totalPages = cadsitdocResumidoModel.totalPages;
        this.fAtualizarArquivosOk();


      })

    }, error => {
      this.snotifyService.error(HttpMensage(error));
    }
    )

    // termino

  }

  fAtualizarArquivosOk() {
    this.mArquivosOk = true;
    this.mArquivosOkSemInvFinal = true;


    this.dataSourceWithPageSizeSit.data.forEach(sitdoc => {

      this.mArquivosOk = sitdoc.sdrQtdErros <= 0;

      this.mArquivosOkSemInvFinal = (sitdoc.sdrQtdErros - sitdoc.sdrQtdInvfinFalta) <= 0;
      console.log('qtd erros ',sitdoc.sdrQtdErros , ' qtd falta inv ', sitdoc.sdrQtdInvfinFalta);
      console.log('arquivo final ', this.mArquivosOkSemInvFinal);
      console.log('arquivo ok ', this.mArquivosOk);
      

      return;

    })


  }
  // sit termino

  changeStyle(pNomeCampo) {
    //console.log('pnomecampo ', pNomeCampo)
    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: String = this.captionColumns[index].align;
      //      console.log('index ', index, 'align ', mAlign)

      if (mAlign === "right") {
        return { 'text-align': 'right' };
      } else if (mAlign === "center") {
        return { 'text-align': 'center' };
      } else
        return { 'text-align': 'left' };
    }
    //return { 'flex': `0 0 ${item.percent};` };
    //    [ngStyle]="{'text-align': 'right'}"

    //    return { 'flex': `0 0 ${item.percent};` };

  }

  // inicio 

  changeStyleSit(pNomeCampo) {
    let index = this.captionColumnsSit.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: String = this.captionColumnsSit[index].align;

      if (mAlign === "right") {
        return { 'text-align': 'right' };
      } else if (mAlign === "center") {
        return { 'text-align': 'center' };
      } else
        return { 'text-align': 'left' };
    }

  }

  //termino


  getAlingn(pNomeCampo) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: String = this.captionColumns[index].align;
      if (mAlign === "right") {
        return "text-align:right";
      } else if (mAlign === "center") {
        return "text-align:center";
      } else
        return "text-align:left";

    }
  }

  getAlingnSit(pNomeCampo) {

    let index = this.captionColumnsSit.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: String = this.captionColumnsSit[index].align;
      if (mAlign === "right") {
        return "text-align:right";
      } else if (mAlign === "center") {
        return "text-align:center";
      } else
        return "text-align:left";

    }
  }




  getColumnName(pNomeCampo) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return
    } else {
      let mCaption: String = this.captionColumns[index].caption;

      return mCaption;
    }
  }


  getColumnNameSit(pNomeCampo) {

    let index = this.captionColumnsSit.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return
    } else {
      let mCaption: String = this.captionColumnsSit[index].caption;

      return mCaption;
    }
  }

  *
    getStyle3(any) {

    let index: number = this.displayedColumns.indexOf(any);

    let mTamanho: number = this.captionColumns[index].weight;

    return ' ' + mTamanho + '% ';

  }


  getStyle3Sit(any) {

    let index: number = this.displayedColumnsSit.indexOf(any);

    let mTamanho: number = this.captionColumnsSit[index].weight;

    return ' ' + mTamanho + '% ';

  }



  fValorENomeDoCampoParaformatar(pValor: any, pNomeCampo: string) {


    //console.log('pvalro ', pValor, ' nome do campo ', pNomeCampo);

    let mValor: String = pValor;


    let mIndex = this.captionColumns.findIndex(x => x.name == pNomeCampo);


    let mTipoCampo: String = this.captionColumns[mIndex].mask;


    return this.fRetornaFormatado(mValor, mTipoCampo.toString());

  }




  fSubstituirTagOkErro(pTexto: any) {
    let ok = "👍";
    let Erro = "😡";
    pTexto = pTexto.toString().replaceAll('$[ERRO]', Erro);
    pTexto = pTexto.replaceAll('$[OK]', ok);
    return pTexto;

  }


  fValorENomeDoCampoParaformatarSit(pValor: any, pNomeCampo: string) {

    //    let mValor: String = pValor[pNomeCampo];

    let mValor: String = pValor;


    let mIndex = this.captionColumnsSit.findIndex(x => x.name == pNomeCampo);


    let mTipoCampo: String = this.captionColumnsSit[mIndex].mask;


    return this.fRetornaFormatado(mValor, mTipoCampo.toString());
  }



  changeEvent(evento: any) {
    /*    console.log('evento ', evento)
        this.filterPaginatorSit.page = evento.pageIndex;
        this.filterPaginatorSit.size = evento.pageSize;
    */
    this.filterPaginator.page = evento.pageIndex;
    this.filterPaginator.size = evento.pageSize;

    /*    console.log('pagina ', this.filterPaginator.page)
        console.log('pagina index ', this.paginatorPageSize.pageIndex)
        console.log('pagina size', this.paginatorPageSize.pageSize)
    */
    this.buscarCaddocResumido();
  }


  changeEventSit(evento: any) {
    this.filterPaginatorSit.page = evento.pageIndex;
    this.filterPaginatorSit.size = evento.pageSize;
    this.buscarCadSitdocResumido();
  }


  fRetornaFormatado(pValor: any, pDataMask: string) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }

  /*
  handlePage($event) {
    console.log($event);
  }
  */

  // inicio upload

  selecFiles($event) {
    let filesSelected: File[] = $event.target.files;
    for (let index = 0; index < filesSelected.length; index++) {
      let element: File = filesSelected[index];
      this.formData.append(`files`, element);
      this.files.push(element);
      let cadpessoasDocModel: CadpessoasDocModel = {};
      cadpessoasDocModel.pdNome = element.name;
      cadpessoasDocModel.pdArquivoNome = element.name;


      cadpessoasDocModel.pdIdPessoa = FuncoesGerais.toInt(this.session.companyId);
      cadpessoasDocModel.pdEvalido = "S";
      cadpessoasDocModel.pdOrigemArquivo = "Front";
      cadpessoasDocModel.pdObs = "Enviado Pelo AuditSys v01.0";
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
      this.formData.append('pIdPessoa', this.session.companyId);
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


    let response: Response;
    let pathUplod: string = 'cadpessoas/files';
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
        console.log('response ', response.success,' erro ', response.error );
        if (response.success) {
        this.fIrParaDashboard01();
        } else {
          this.mProcessando = false;
          this.mEstaProcessando = false;
          this.snotifyService.warning(response.error);
    
        }

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


  fIrParaDashboard01() {
    if (this.mProcessando == false) {
      this.mEstaProcessando = false;
      this.processar();
    }

  }

  fCriarForm() {
    this.form = this.formBuilder.group({
      files: new FormControl([null], Validators.required),
      pIdPessoa: new FormControl([null], Validators.required),
      data: new FormControl([null], Validators.required),
      dataExcluidos: new FormControl([null], Validators.required),
    })
  }


  // termino upload  


  /*
  visible() {
    this.progressVisible = this.progressVisible == false;


  }
*/
  apresentarPercentual() {
    this.progresso += 10;
  }

  pararIntevalo() {
    clearInterval(this.intervalo);

  }

  // da importação dos registros inicio


  processar() {


    if (this.mProcessando) {
      this.parar()
    } else {

      this.data = [];
      this.mQtdNotificacao = 0;

      this.api.fRenovarToken();
      this.start();
      this.habilitar();

    }

  }


  habilitar() {


    //this.visible();

    //    this.progressVisible = true;


    let accessToken = this.session.getJwt().access_token;


    //   `${environment.url}socketImportarDados`,

    if (this.webSocketConnector == undefined) {
      this.webSocketConnector = new WebSocketConnector(
        accessToken,
        `${environment.url}socketImportarDados`,
        '/statusProcessorImportarDados',
        this.onMessage.bind(this)
      );

    }




  }

  onMessage(message: any): void {
    let texto: String = message.body;
    if (message.body) {
      if (texto.indexOf("Terminou!") > 0) {

        this.parar();
        //        this.fecharJanela();
      } else {


        this.buscarDados();
        this.buscarCaddocResumido();
        this.buscarCadSitdocResumido();


        //      this.buscarProcessosExecutados();

        //      this.fAdicionarDados(message.body);
      }
    }
  }


  buscarDados() {


    this.filtrosGenericosLista = new VerificaFiltrosVazio(this.filtrosGenericosLista).fVerificaFiltrosVazio();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;

    this.dasboard01Service.BuscarDashboard01(parametrosDados).subscribe((Dashboard01Model) => {
      safeCall(Dashboard01Model, () => {
        this.configurar(Dashboard01Model);
      })
    }, error => {
      this.snotifyService.error(error.error.message);
    }
    )

  }
  configurar(dashboard01Model: Dashboard01Model[]) {
    console.log('percentual chegou ', dashboard01Model[0].percentualProcConcluido);
    if (dashboard01Model[0].percentualProcConcluido > 50) {
      this.progresso = Math.trunc(dashboard01Model[0].percentualProcConcluido);
    } else {
      this.progresso = Math.round(dashboard01Model[0].percentualProcConcluido);
    }

    //(dashboard01Model[0].qtdProcConcluido / dashboard01Model[0].qtdProcGeral) * 100;

    //lindomar
  }


  start() {

    //    this.progressVisible = true;

    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "servico", "=", "ImportarDados", 0, "").adicionarfiltros();

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "idPessoa", "=",
      this.session.companyId.toString(), 0, "").adicionarfiltros();






    //    this.filtrosGenericosLista = new VerificaFiltrosVazio(this.filtrosGenericosLista).fVerificaFiltrosVazio();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;


    this.mProcessando = true;
    this.api.put('appImportarDados', parametrosDados)
      .subscribe(response => { console.log(response); console.log('comecou!') });


  }


  parar() {
    this.mProcessando = false;
    //    this.progressVisible = false;
    try {
      this.webSocketConnector.stop();
      this.webSocketConnector = null;

      this.buscarCaddocResumido();
      this.buscarCadSitdocResumido();



    } catch (error) {
      console.log('Erro ao tentar desconectar do websocket')

    }

    console.log('parando webSeocket')
  }

  // da importação dos registros termino

  BaixarArquivo(element: CadsitdocResumidoModel) {


    // inicio



    const dialogRef = this.dialog.open(EfdSemXmlModalComponent, {
      disableClose: true,
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idPessoa: this.session.companyId,
        ano: element.sdrAno,
        mes: element.sdrMes

      }
    });


  }

  BaixarArquivoTodos() {


    // inicio



    const dialogRef = this.dialog.open(EfdSemXmlModalComponent, {
      disableClose: true,
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idPessoa: this.session.companyId,
        ano: 0,
        mes: 0

      }
    });


  }


  // inicio

  fExisteErros(pValor: CadsitdocResumidoModel): boolean {

    //    console.log("pValor ", pValor.sdrErros, "  outro ", pValor.sdrMesAno)
    return pValor.sdrErros;
  }


  fChamarFormCadlogExcessoes() {
    const dialogRef = this.dialog.open(CadlogExcessoesComponent, {
      disableClose: true,
      panelClass: 'app-no-padding-dialog',
      width: '99%',
      height: '99%',
      data: {
        idPessoa: this.session.companyId
      }
    });
  }

  MostrarErros() {
    this.snotifyService.info("Mostrar Erros");

  }

  // inicio 


  verificaProcessosPendentes() {

    // inicio

    this.homePageService.getProcessosPendentes(this.session.companyId).subscribe((ProcessosPendentesModel) => {


      safeCall(ProcessosPendentesModel, (processosPendentesModel) => {

        if (processosPendentesModel.qtdPend > 0) {
          this.fIrParaDashboard01();

        }


      })

    }, error => {
      this.snotifyService.error(HttpMensage(error));
    }
    )

    // termino

  }
  emProducao() {
    this.snotifyService.info("Em Produção")
  }

  // termino


  baixarDocumento(pNomeRel: string, pUrl: string) {
    this.isLoading = true;


    if (this.mGerarPlanilha) {
      this.fBuscarPlanilha(pNomeRel, pUrl + "Planilha");

    } else {
      this.baixarRelatorio(pNomeRel, pUrl + "Relatorio");

    }

  }

  baixarRelatorio(pNomeRel: string, pUrl: string) {


    //    this.snotifyService.warning("vai baixar relatorio");

    this.mDisableButons = true;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "qtdRegMax", "=", "10",
        1, getRelacionarCondicao()[0].id).adicionarfiltros();

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "idPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = pNomeRel;
    // inicio

    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = pUrl;

    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    // termino





  }

  // inicio planilha 


  fBuscarPlanilha(pNomeRel: string, pUrl: string) {




    this.mDisableButons = true;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "qtdRegMax", "=", "10",
        1, getRelacionarCondicao()[0].id).adicionarfiltros();

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "idPessoa", "=", this.session.companyId,
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


  // termino planilha

  validarPlanilha() {
    this.mGerarPlanilha = this.mGerarPlanilha == false;
  }

}
