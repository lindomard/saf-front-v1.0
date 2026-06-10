import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ControllerNavForm } from '@home/component/main-nav/controller-nav-form';
import { Cadrc100ConsultaService } from './cadrc100-consulta.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { SessionService } from '@base-core/session/session.service';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { safeCall } from '@base-core/safe-call';
import { SnotifyService } from 'ng-snotify';
import { TabelaBaseC100Model, tabelaBaseRc170 } from './model/TabelaBaseModel';
import * as moment from 'moment';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ParseFloat } from '@base-shared/funcoesGerais/function-form';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDetailRowDirective } from './cdk-detail-row.directive';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { Router } from '@angular/router';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';



@Component({
  selector: 'app-cadrc100-consulta',
  templateUrl: './cadrc100-consulta.component.html',
  styleUrls: ['./cadrc100-consulta.component.scss'],
  animations: [
    trigger("detailExpand", [
      state(
        "void",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("*", style({ height: "*", visibility: "visible" })),
      transition("void <=> *", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
    ])
  ]



})
export class Cadrc100ConsultaComponent implements OnInit {

  @Input() singleChildRowDetail: boolean;

  constructor(private cadrc100ConsultaService: Cadrc100ConsultaService
    , private session: SessionService
    , private snotifyService: SnotifyService
    , private cd: ChangeDetectorRef
    , private router: Router


  ) { }

  displayRecordCount = '5';
  selectedRowIndex: any;
  tabelaBaseLista: TabelaBaseC100Model[] = [];

  tipoAcaoName: string = "Cadrc100 - Consulta";

  tipoEvento: string = "Carregando dados...";


  @ViewChildren("innerTables") innerTables: QueryList<MatTable<TabelaBaseC100Model>>;
  /*
    columnsToDisplay = ['rc100CodMod', 'rc100CodSit', 'rc100Ser', 'rc100NumDoc', 'rc100ChvNfe', 'rc100CodPart'
    , 'r0150Nome', 'r0150Cnpj', 'r0150Cpf', 'r0150Ie', 'r0150CodMun', 'r0150Suframa', 'rc100DtDoc', 'rc100VlDoc'
    , 'rc100IndPgto', 'rc100VlMerc', 'r0000IndAtiv'];
  */

  displayedColumns = ['rc100CodMod', 'rc100CodSit', 'rc100Ser', 'rc100NumDoc', 'rc100ChvNfe', 'rc100CodPart'
    , 'r0150Nome', 'r0150Cnpj', 'r0150Cpf', 'r0150Ie', 'r0150CodMun', 'r0150Suframa', 'rc100DtDoc', 'rc100VlDoc'
    , 'rc100IndPgto', 'rc100VlMerc', 'r0000IndAtiv']


  displayedColumnsSub = ["rc170NumItem", "r0200CodItem", "r0200DescrItem", "r0200CodAntItem", "r0200TipoItem"
    , "rc170Qtd", "rc170Unid",
    "rc170VlItem", "rc170VlDesc", "rc170CstIcms", "rc170Cfop", "rc170VlBcIcms", "rc170AliqIcms", "rc170VlIcms", "rc170VlBcIcmsSt",
    "rc170AliqSt", "rc170VlIcmsSt", "rc170VlIpi", "rc170VlPis", "rc170CstCofins", "rc170VlFrt", "rc170VlSeg", "calcDA",
    "rc170VlAbatNt"];

  //  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  //  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;
  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 20];
  dataSourceWithPageSize = new MatTableDataSource<TabelaBaseC100Model>([]);


  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  

  //  (element.tabelaBaseC170Model as MatTableDataSource<TabelaBaseC100Model>).data.length


  cadArqMagneticoModel: TabelaBaseC100Model[] = [];

  expandedElement: TabelaBaseC100Model | null;

  ngOnInit(): void {




    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 20;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;


    //    this.paginatorPageSize.pageIndex = this.filterPaginator.page;
    //    this.paginatorPageSize.pageSize = this.filterPaginator.size;
    //    this.paginatorPageSize.length = 4800;

    this.fBuscarTabelaBase();


    //    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
    //    this.paginatorPageSize.pageIndex = 1;

    //    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

  }


  highlight(row) {
    console.log('clicou ', row.position)
    this.selectedRowIndex = row.position;
  }

  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;
    this.fBuscarTabelaBase();

    /*
        console.log('Page ',this.filterPaginator.page , '/' , this.paginatorPageSize.pageIndex );
        console.log('Size ',this.filterPaginator.size , '/' ,this.paginatorPageSize.pageSize );
        console.log('Total elemetos ',this.filterPaginator.totalElements , '/nc'  );
        console.log('Total Paginas ',this.filterPaginator.totalPages , '/' ,this.paginatorPageSize.length );
    
        console.log('change event')
    */
    //    @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;

  }


  fBuscarTabelaBase() {
    this.tipoEvento = "buscando dados...";



    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc100IdPessoa", "=", this.session.companyId,0,"").adicionarfiltros();

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc100CodSit", "<>", "02",0,"").adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;

    this.cadrc100ConsultaService.BuscarTabelaBasePage(parametrosDados)
      .subscribe((response) => {
        safeCall(response, () => {

          if (response.success) {
          this.dataSourceWithPageSize.data = [...response.objeto.content];
          this.filterPaginator.page = response.objeto.pageable.pageNumber;
          this.filterPaginator.size = response.objeto.pageable.pageSize;
          this.filterPaginator.totalElements = response.objeto.totalElements;
          this.filterPaginator.totalPages = response.objeto.totalPages;


          this.dataSourceWithPageSize.data.forEach((c100) => {
            console.log("c100 ", c100.r0150Nome);

          })
        } else {
          this.snotifyService.error(response.error);
        }
          this.tipoEvento = "navegando...";

          //          this.dataSourceWithPageSize.data = [...CadArqMagneticoModel.content];

        })
      }, error => {
        this.tipoEvento = "navegando...";
        this.snotifyService.error(error.error.message);
      }
      )


  }


  fRetornaFormatado(pValor: any, pDataMask: string) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
      ((table.dataSource as MatTableDataSource<
        TabelaBaseC100Model
      >).filter = filterValue.trim().toLowerCase())
    );
  }


  toggleRow(element: TabelaBaseC100Model) {
    debugger;
    element.tabelaBaseRc170 &&
      (element.tabelaBaseRc170.length)
      ? (this.expandedElement =
        this.expandedElement === element ? null : element)
      : null;
    this.cd.detectChanges();
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
  }


  private openedRow: CdkDetailRowDirective;

  onToggleChange(cdkDetailRow: CdkDetailRowDirective): void {
    //    this.expandir = !this.expandir;
    if (
      this.singleChildRowDetail &&
      this.openedRow &&
      this.openedRow.expended
    ) {
      this.openedRow.toggle();

    }
    //    this.expandirRecolher =  cdkDetailRow.expended ? "Recolher 1" : "Expandir 1";
    this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
  }

  isSticky() {
    return false;
  }

  cancelarESair() {
    if (this.session.companyId == "0") {
  
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/home']);
    }
  
  }  
}