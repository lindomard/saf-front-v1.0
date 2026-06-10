import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Dasboard01Service } from './dashboard01.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { VerificaFiltrosVazio } from '@base-shared/funcoesGerais/verificaFiltrosVazio';
import { safeCall } from '@base-core/safe-call';
import { Dashboard01Model } from './model/dashboard01Model';
import { SnotifyService } from 'ng-snotify';
import { WebSocketConnector } from '../websocket/websocket-connector';
import { SessionService } from '@base-core/session/session.service';
import { environment } from 'src/environments/environment';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { MessageService } from '../websocket/message.service';
import { Router } from '@angular/router';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { Observable } from 'rxjs';
import { Config } from './processos-executados/model/config';
import { DataTable } from './processos-executados/model/table';
import { Person } from './processos-executados/model/person';
import { ApiService } from './processos-executados/model/api.service';
import { PageRequest } from './processos-executados/model/PageRequest';
import { ApiAnswer } from './processos-executados/model/api-answer';
import { map } from 'rxjs/operators';
import { CadpessoasProcessosModel } from '../cadcli/model/cadpessoasModel';
import { ProcessosExecutadosModel } from './processos-executados/model/processo-executadosModel';
import { ConfigProcessosExecutados } from './processos-executados/model/configProcessosExecutados';
import { ProcessosExecutadosComponent } from './processos-executados/processos-executados.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CadlogExcessoesComponent } from '../cadlog/cadlog-excessoes/cadlog-excessoes.component';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-dashboard01',
  templateUrl: './dashboard01.component.html',
  styleUrls: ['./dashboard01.component.scss']
})
export class Dashboard01Component implements OnInit {

  private static defaulPageSize = 5;
  private static defaultPage = 0;

  data: any[] = [];

  boolVar: boolean = false;
  // public config$: Observable<Config>;
  // public configProcessosExecutados$: Observable<ConfigProcessosExecutados>;
  // public data$: Observable<DataTable<Person>>;


  //  public dataProcessosExecutados$: ProcessosExecutadosModel[];

  public processosExecutadosModel: ProcessosExecutadosModel[] = [];

  constructor(private dasboard01Service: Dasboard01Service
    , private snotifyService: SnotifyService
    , private session: SessionService
    , private cd: ChangeDetectorRef
    , private api: ApiCreateHttpclienteService
    , private service: MessageService
    , private router: Router
    , private _apiService: ApiService
    , private _router: Router
    , private fb: FormBuilder
    , public dialog: MatDialog,
  ) {
    /*
        this.config$ = this._apiService.getConfig();
        this.configProcessosExecutados$ = this._apiService.getConfigProcessosExecutados();
        this.data$ = this._apiService.getData(Dashboard01Component.defaulPageSize, Dashboard01Component.defaultPage)
          .pipe(
            map(this._createDataTable)
          );
    
          */

  }

  // TERCEIRO

  @ViewChild('instanceTableListGerais', { static: true }) instanceTableListGerais: ProcessosExecutadosComponent;

  public chartTypeDash01: string = 'pie';

  public barChartLegend = true;
  public barChartPlugins = [];


  buttonErros: string = "Impedimento";
  buttonAdvertencia: string = "Advertencias";


  profileForm: FormGroup;

  optionsDash01: Array<any> = [];

  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  mProcessando: boolean = false;
  mQtdNotificacao: number = 0;

  mIdPessoa: any;
  private webSocketConnector: WebSocketConnector;

  public pieChartLabels: string[] = ['Chrome', 'Safari', 'Firefox', 'Internet Explorer', 'Other'];
  public pieChartData: number[] = [40, 20, 20, 10, 10, 4];
  public pieChartType: string = 'pie';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: this.pieChartData
        ,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ]
        ,
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 3

        , label: ''
      }
    ]
  };


  public valueKey = 'id';
  public labelKey = 'name';

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  // TERCEIRO


  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }


  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;


  ngOnInit(): void {
    this.mIdPessoa = this.session.companyId;
    this.criarForm();
    this.preencherSelect();
    this.processar();


  }


  preencherSelect() {

    this.optionsDash01 = [];
    this.optionsDash01.push({ id: "01", name: "Barras Vertical" });
    this.optionsDash01.push({ id: "02", name: "doughnut-bar-chart" });
    this.optionsDash01.push({ id: "03", name: "Linhas" });
    this.optionsDash01.push({ id: "04", name: "radar" });
    this.optionsDash01.push({ id: "05", name: "stacked-bar-chart" }); // bar
    this.optionsDash01.push({ id: "06", name: "polarArea-bar-chart" }); // polarArea
    this.optionsDash01.push({ id: "07", name: "pie-chart" }); //pie
    //    this.optionsDash01.push({ id: "08", name: "doughnut-bar-chart" }); // doughnut
    this.profileForm.get("firstNameDash01").setValue("07");


  }

  // inicio 


  changeDash01($event) {

    console.warn(this.profileForm.value);


    if (this.profileForm.get("firstNameDash01").value == "01") {
      this.chartTypeDash01 = 'bar';
    }
    else if (this.profileForm.get("firstNameDash01").value == "02") {
      this.chartTypeDash01 = 'doughnut';
    }
    else if (this.profileForm.get("firstNameDash01").value == "03") { //line chart
      this.chartTypeDash01 = 'line';
    }
    else if (this.profileForm.get("firstNameDash01").value == "04") { //radar-chart
      this.chartTypeDash01 = 'radar';
    }
    else if (this.profileForm.get("firstNameDash01").value == "05") { //stacked-bar-chart
      this.chartTypeDash01 = 'bar';
    }
    else if (this.profileForm.get("firstNameDash01").value == "06") { //polarArea-bar-chart
      this.chartTypeDash01 = 'polarArea';
    }
    else if (this.profileForm.get("firstNameDash01").value == "07") { //pie-chart
      this.chartTypeDash01 = 'pie';
    }
    // else if (this.profileForm.get("firstNameDash01").value == "08") { //doughnut-bar-chart
    //   this.chartTypeDash01 = 'doughnut';
    // }
    else {
      console.log("desconhecido");
    }
  }

  // termino

  criarForm() {


    this.profileForm = this.fb.group({
      firstNameDash01: ['02']
      , firstNameDash02: ['01']
    });



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



  buscarProcessosExecutados() {


    this.filtrosGenericosLista = new VerificaFiltrosVazio(this.filtrosGenericosLista).fVerificaFiltrosVazio();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;

    this.dasboard01Service.BuscarProcessosExecutados(parametrosDados).subscribe((ProcessosExecutadosModel) => {
      safeCall(ProcessosExecutadosModel, () => {
        this.processosExecutadosModel = ProcessosExecutadosModel;

        this.instanceTableListGerais.fillData(this.processosExecutadosModel);

      })
    }, error => {
      this.snotifyService.error(error.error.message);
    }
    )

  }


  // termino


  configurar(dashboard01Model: Dashboard01Model[]) {




    if (dashboard01Model[0].recebidos != undefined) {


      this.buttonErros = "Impedimento [" + dashboard01Model[0].qtdErros + "]";
      this.buttonAdvertencia = "Advertencias [" + dashboard01Model[0].qtdAdvertencias + "]";

      this.pieChartLabels = [];
      this.pieChartData = [];

      this.pieChartLabels.push('Total de Registros  ' + dashboard01Model[0].qtdtotal);
      this.pieChartData.push(dashboard01Model[0].qtdtotal);

      this.pieChartLabels.push('Recebidos  ' + dashboard01Model[0].recebidos);
      this.pieChartData.push(dashboard01Model[0].recebidos);

      this.pieChartLabels.push('Processando ' + dashboard01Model[0].processando);
      this.pieChartData.push(dashboard01Model[0].processando);


      this.pieChartLabels.push('Processado Ok ' + dashboard01Model[0].processadoOk);
      this.pieChartData.push(dashboard01Model[0].processadoOk);

      this.pieChartLabels.push('Erros 03 ' + dashboard01Model[0].erro03);
      this.pieChartData.push(dashboard01Model[0].erro03);

      this.pieChartLabels.push('Cnpj Invalido ' + dashboard01Model[0].cnpjInvalido);
      this.pieChartData.push(dashboard01Model[0].cnpjInvalido);
      this.pieChartLabels.push('Fora do Periodo ' + dashboard01Model[0].foraPeriodo);
      this.pieChartData.push(dashboard01Model[0].foraPeriodo);
      this.pieChartLabels.push('Erros 06 ' + dashboard01Model[0].erro06);
      this.pieChartData.push(dashboard01Model[0].erro06);
      this.pieChartLabels.push('Erros 07 ' + dashboard01Model[0].erro07);
      this.pieChartData.push(dashboard01Model[0].erro07);
      this.pieChartLabels.push('Erros 08 ' + dashboard01Model[0].erro08);
      this.pieChartData.push(dashboard01Model[0].erro08);
      this.pieChartLabels.push('Erros 09 ' + dashboard01Model[0].erro09);
      this.pieChartData.push(dashboard01Model[0].erro09);





      //    this.pieChartLabels = ['Chrome alt', 'Safari alt', 'Firefox alt', 'Internet Explorer alt', 'Other alt'];
      //    this.pieChartData = [40, 20, 20, 10, 10, 4];


      // inicio

      this.barChartData = {
        labels: this.pieChartLabels,
        datasets: [
          {
            data: this.pieChartData
            ,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ]
            ,
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 3

            , label: 'grupo 03'
          }
        ]
      };
    }
    // termino


  }

  habilitar() {



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
        this.buscarProcessosExecutados();

        this.fAdicionarDados(message.body);
      }
    }
  }


  start() {



    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "servico", "=", "ImportarDados", 0, "").adicionarfiltros();

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "idPessoa", "=", this.mIdPessoa, 0, "").adicionarfiltros();






    //    this.filtrosGenericosLista = new VerificaFiltrosVazio(this.filtrosGenericosLista).fVerificaFiltrosVazio();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;


    this.mProcessando = true;
    this.api.put('appImportarDados', parametrosDados)
      .subscribe(response => { console.log(response); console.log('comecou!') });


  }

  parar() {
    this.mProcessando = false;

    try {
      this.webSocketConnector.stop();
      this.webSocketConnector = null;

    } catch (error) {
      console.log('Erro ao tentar desconectar do websocket')

    }

    console.log('parando webSeocket')
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

  Sair() {
    this.router.navigate(['/page/home']);

  }


  MostrarErros() {
    this.snotifyService.info("Mostrar Erros");

  }


  NovaRotina() {

  }

  // daqui para baixo
  send(msg: string) {
    this.service.send(msg);
  }

  private _createDataTable(answer: ApiAnswer<Person>): DataTable<Person> {
    const currentPage = Math.ceil(answer.offset / answer.limit) + 1;
    const lastPage = Math.ceil(answer.total / answer.limit);
    const result: DataTable<Person> = {
      pageActual: currentPage,
      lastPage: lastPage,
      data: answer.result
    }

    return result;
  }


  /*
    public updateTable(pageRequest: PageRequest) {
      this.data$ = this._apiService.getData(pageRequest.size, (pageRequest.page * pageRequest.size))
        .pipe(
          map(this._createDataTable)
        );
    }
  */
  public goDetails(index: number) {
    this._router.navigateByUrl(`details/${index}`);
  }



  fChamarFormCadlogExcessoes() {
    const dialogRef = this.dialog.open(CadlogExcessoesComponent, {
      disableClose: true,
      panelClass: 'app-no-padding-dialog',
      width: '99%',
      height: '99%',
      data: {
        idPessoa: this.mIdPessoa
      }
    });
  }








}