import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { safeCall } from '@base-core/safe-call';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SessionService } from '@base-core/session/session.service';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { SnotifyService } from 'ng-snotify';
import { ProcessarService } from 'src/app/cadcli/processar/processar.service';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { GenericosService } from 'src/app/genericos/genericos.service';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gerar-cadrc170-sefaz',
  templateUrl: './gerar-cadrc170-sefaz.component.html',
  styleUrls: ['./gerar-cadrc170-sefaz.component.scss']
})
export class GerarCadrc170SefazComponent implements OnInit {

  private webSocketConnector: WebSocketConnector;

  tipoEvento = "Gerar CADREG170 - Padrao Sefaz";
  isLoading = false;
  filtrosGenericosLista: FiltrosGenericosModel[] = [];
  mDisableGerar: boolean = false;
  mProcessando: boolean = false;
  mNomeCadrc170Sefaz: String = "";

  constructor(
    private session: SessionService
    , private snotifyService: SnotifyService
    , private router: Router
    , private baixarArquivosService: BaixarArquivosService
    , private processarService: ProcessarService
    , private api: ApiCreateHttpclienteService


  ) { }

  ngOnInit(): void {

    ProcessarService.terminouProcesso.subscribe(terminou => {

      if (terminou == true) {
        console.log('recebeu o evento termininou 49');
        this.tipoEvento = "Aguardando....";
        this.hideLoading();

      }
    })

  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }

  cancelarESair() {
    if (this.session.companyId == "0") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/home']);
    }

  }


  // inicio 
  gerarArquivo() {
    this.showLoading();
    this.mDisableGerar = true;
    let filtrosGenericosLista: FiltrosGenericosModel[] = [];

    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId, 0, "").adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = filtrosGenericosLista;

    this.processarService.gerarArqMagneticos("cadrc170SefazArquivo", parametrosDados).subscribe((RespostaComMensagemModel) => {
      safeCall(RespostaComMensagemModel, () => {
        this.processar();


        this.mDisableGerar = false;
      })

    }, error => {
      this.snotifyService.error(error.error.message);
      this.mDisableGerar = false;
    }
    )



  }
  // inicio


  processar() {


    if (this.mProcessando) {
      this.parar()
    } else {


      this.api.fRenovarToken();
      this.start();
      this.habilitar();

    }

  }

  parar() {
    this.mProcessando = false;

    try {
      this.webSocketConnector.stop();
      this.webSocketConnector = null;
      this.BaixarArquivo(this.mNomeCadrc170Sefaz);


    } catch (error) {
      console.log('Erro ao tentar desconectar do websocket')

    }

  }



  start() {



    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "servico", "=", "GerarCadRegC170Sefaz", 0, "").adicionarfiltros();

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "idPessoa", "=", this.session.companyId, 0, "").adicionarfiltros();





    //    this.filtrosGenericosLista = new VerificaFiltrosVazio(this.filtrosGenericosLista).fVerificaFiltrosVazio();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    this.mProcessando = true;
    this.api.put('appImportarDados', parametrosDados)
      .subscribe(response => { });





  }



  habilitar() {



    let accessToken = this.session.getJwt().access_token;



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
    let mProcura = "]\n";
    let texto: String = message.body;
    if (message.body) {
      if (texto.indexOf("Terminou!") > 0) {

        this.parar();
      } else {
        let mArquivo: string = message.body;
        let mIndex = mArquivo.indexOf(mProcura);
        if (mIndex>0) {
          mArquivo = mArquivo.substring(mIndex+2,mArquivo.length);
        }
        this.mNomeCadrc170Sefaz = mArquivo;


        console.log(mArquivo+"/mindex =" +mIndex );
      }
    }
  }


  // final 


//BAIXAR


BaixarArquivo(cadGeraArquivosModel: any) {

    let filtrosGenericosLista: FiltrosGenericosModel[] = [];
    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, this.mNomeCadrc170Sefaz  , "=", 
    this.mNomeCadrc170Sefaz,0,"").adicionarfiltros();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = filtrosGenericosLista;



    this.processarService.buscarArquivoPorNome(parametrosDados);
    
   


  }

  fAcionarEvento() {
    
        this.processarService.fAcionarEvento();
  }

}



