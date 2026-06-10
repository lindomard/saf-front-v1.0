import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { SessionService } from '@base-core/session/session.service';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';
import { environment } from 'src/environments/environment';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-gerar-arq-magnetico-sintegra',
  templateUrl: './gerar-arq-magnetico-sintegra.component.html',
  styleUrls: ['./gerar-arq-magnetico-sintegra.component.scss']
})
export class GerarArqMagneticoSintegraComponent implements OnInit {

  private webSocketConnector: WebSocketConnector;

  @Output() AcionarHistorico = new EventEmitter<any>();

  constructor(
     private api: ApiCreateHttpclienteService
     , private session: SessionService
     , private cd: ChangeDetectorRef



  ) { }

  mProcessando: boolean = false;

  mQtdNotificacao: number = 0;

  mIdPessoa: any;

  data: any[] = [];


  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  ngOnInit(): void {
    this.mIdPessoa = this.session.companyId;

  }

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

  parar() {
    this.mProcessando = false;

    try {
      this.webSocketConnector.stop();
      this.webSocketConnector = null;

    } catch (error) {
      console.log('Erro ao tentar desconectar do websocket')

    }

  }



  start() {



    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "servico", "=", "GerarArqMagnetico",0,"").adicionarfiltros();

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "idPessoa", "=", this.mIdPessoa,0,"").adicionarfiltros();





    //    this.filtrosGenericosLista = new VerificaFiltrosVazio(this.filtrosGenericosLista).fVerificaFiltrosVazio();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    this.mProcessando = true;
    this.api.put('appImportarDados', parametrosDados)
      .subscribe(response =>
         {  });





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
  
  
    fAdicionarDados(pTexto: String) {

      this.mQtdNotificacao++;
      const item = {
        Notificacao: this.mQtdNotificacao,
        Recebido: new Date,
        name: pTexto,
      };
  
      this.data.unshift(item);
      this.cd.detectChanges();
  
  
    }
  

    onMessage(message: any): void {
      let texto: String = message.body;
      if (message.body) {
        if (texto.indexOf("Terminou!") > 0) {
  
          this.parar();
          //        this.fecharJanela();
        } else {
  

  
//          this.buscarDados();
  //        this.buscarProcessosExecutados(); 
  console.log('emtindo evento 164 ');
        this.AcionarHistorico.emit();


  
          this.fAdicionarDados(message.body);
        }
      }
    }

    
    
}
