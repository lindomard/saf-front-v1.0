import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageMatPagination, VisibleButton } from '@base-core/model/page-mat-pagination.model';
import { Page } from '@base-core/model/page.model';
import { safeCall } from '@base-core/safe-call';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ParseFloat } from '@base-shared/funcoesGerais/function-form';
import { ResizeEvent } from 'angular-resizable-element';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-list-genesis',
  templateUrl: './table-list-genesis.component.html',
  styleUrls: ['./table-list-genesis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [trigger('fadeInd', fadeIn(':enter'))]
})
export class TableListGenesisComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @Input() acionarProximoRegistro: Subject<boolean>;
  @Input() acionarAnteriorRegistro: Subject<boolean>;

  @Input() acionarPrimeiroRegistro: Subject<boolean>;

  @Input() acionarUltimoRegistro: Subject<boolean>;

  @Input() displayColumns: string[] = [];
  @Input() paginatorSize: string[] = ['3', '5', '10', '15', '20', '30', '50'];
  @Input() length = 0;
  @Input() itens: ItemTable;
  @Input() header = true;
  @Input() data: Array<any> = [];
  @Input() pageIndex = 0;
  @Input() pageSize = 0;
  @Input() isPaginator = true;
  @Input() disableButons = false;

  keyLabel: string;


  @Output() clickRowHandler = new EventEmitter<any>();
  @Output() clickRowHandlerDuplo = new EventEmitter<any>();
  @Output() pageHandler = new EventEmitter<PageEvent>();
  @Output() editHandler = new EventEmitter<any>();
  @Output() viewHandler = new EventEmitter<any>();
  @Output() handlerSelected = new EventEmitter<any>();
  @Output() avancarPagina = new EventEmitter<any>();

  @Output() positionHandler = new EventEmitter<any>();

  @Output() deleteHandler = new EventEmitter<number>();
  @Output() handlerPage = new EventEmitter<PageMatPagination>();
  @Output() buttonVisible = new EventEmitter<VisibleButton>();



  irParaultimoReg: boolean = false;
  selection = new SelectionModel<any>(true, []);
  itemsSelected: any[] = [];
  highlightedRows = [];


  visibleButton: VisibleButton = {};

  focused: any;

  //itemAtivo:  ItemTable;


  @ViewChildren('matrow', { read: ViewContainerRef }) rows:
    QueryList<ViewContainerRef>;


  @ViewChildren('instanceCheckbox') listCheckbox: QueryList<MatCheckbox>;

  constructor(
    private cd: ChangeDetectorRef,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {


    try {




      if (this.data!==null ) {

        this.dataSource.data = [... this.data];
        this.focused = this.dataSource.data[0];
        this.acionarProximoRegistro.subscribe(() => this.proximoReg());
        this.acionarAnteriorRegistro.subscribe(() => this.anteriorReg());
    
        this.acionarPrimeiroRegistro.subscribe(() => this.primeiroReg());
        this.acionarUltimoRegistro.subscribe(() => this.ultimoReg());
    
         }
    } catch (error) {

      console.log('erro 60 itens table list Genesis ', JSON.stringify(this.itens), ' error', error);
      console.log('conteudo data ', this.data);

    }

    this.initDeviceDetectorMobile();


  }

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  deviceInfo = null;
  initDeviceDetectorMobile() {
    //identificar plataforma
    //this.deviceInfo = this.deviceService.getDeviceInfo();

    //    this.isMobile = this.deviceService.isMobile();
    //const isTablet = this.deviceService.isTablet();
    //const isDesktopDevice = this.deviceService.isDesktop();
  }

  proximoReg() {
    this.proximoRegistro();
    this.refresh();

  }

  anteriorReg() {
    this.registroAnterior();
    this.refresh();

  }

  primeiroReg() {
    //console.log('acionado primeiro length ', this.length);
    this.mudarPagina((this.length * -1));

    this.refresh();

  }

  ultimoReg() {
    // setTimeout(() => {
    // this.mudarPagina(this.length); }
    // ,200);

    //    console.log('valor de length 111 ', this.length);

    this.irParaultimoReg = true;
    this.mudarPagina(this.length);

    /*
        let l: number = this.dataSource.data.length;

        this.focused = this.dataSource.data[l];

        this.refresh();
    */

  }

  onRowClicked(row: any) {

    if (this.isMobile || this.isTablet) {
      this.onRowClickedDuplo(row);

    } else {
      if (!this.disableButons) {
        this.focused = row;
        this.clickRowHandler.emit(row);
        this.atualizarBotoes();
      }
    }
  }

  onRowClickedDuplo(row: any) {
    if (!this.disableButons) {

      this.focused = row;
      this.clickRowHandlerDuplo.emit(row);
      this.atualizarBotoes();
    }
  }


  changeStyle(item) {
    return { 'flex': `0 0 ${item.percent};` };
  }

  changeCampo() {
    return { 'flex': `0 0 30;` };
  }

  fillData(page: Page<any>) {
    this.isPaginator = true;
    this.pageIndex = page.pageable.pageNumber;
    this.pageSize = page.size;
    this.length = page.totalElements;
    this.dataSource.data = [...page.content];

    this.visibleButton.ativoPrimeiraPagina = page.first;
    this.visibleButton.ativoUltimaPagina = page.last;



    if (this.irParaultimoReg) {
      this.focused = this.dataSource.data[this.dataSource.data.length - 1];
      this.irParaultimoReg = false;
    } else {
      //      console.log('150 aciou o ultimo')
      this.focused = this.dataSource.data[0];

    }
    this.cd.detectChanges();

    this.atualizarBotoes();

  }

  refresh() {
    this.cd.detectChanges();
  }


  fillDataNoPage(data: any[]) {
    //    console.log(" 77  " + JSON.stringify(data))
    this.dataSource.data = [...data];
    this.isPaginator = false;
    this.cd.detectChanges();


  }

  fillSelected(items?: any[], keyLabel?: string) {
    this.keyLabel = keyLabel;
    this.itemsSelected = items;

    setTimeout(() => {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        const data = this.dataSource.data[i];
        const index = items.findIndex(o => o[keyLabel] === data[keyLabel]);
        if (index !== -1) {
          this.selection.select(data);
          this.listCheckbox.toArray()[i].checked = true;
        }
      }
      this.cd.detectChanges();
    });
  }

  setPaginatorSize(paginator: string[]) {
    this.paginatorSize = paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.cleanSelect() : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.handlerSelected.emit(this.selection.selected);
  }

  private cleanSelect() {
    this.selection.clear();
    this.listCheckbox.toArray().forEach(che => che.checked = false);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} }`;
  }

  selectRow($event, row: any) {
    safeCall($event, () => {
      const index = this.selection.selected.findIndex(o => o[this.keyLabel] === row[this.keyLabel]);
      if (index !== -1) {
        this.selection.deselect(row);
        this.selection.selected.splice(index, 0);
        this.itemsSelected = this.selection.selected;
      } else {
        this.selection.select(row);
      }
      this.handlerSelected.emit(this.selection.selected);
    });
  }

  actionEdit(row: any, index: any) {
    this.editHandler.emit({ row, index });
  }

  actionView(row: any) {
    this.viewHandler.emit(row);
  }


  recTrackBy(index: number, row: any) {
    for (var key in row) {
      return FuncoesGerais.toInt(`${row[key]}`);
    }
  }

  getPosition(row: any): number {
    if (!this.disableButons) {

      if (row == undefined) {
        return -1;
      }

      for (var key in row) {
        return FuncoesGerais.toInt(`${row[key]}`);
      }
    }

  }
  showElement(index: number, height: number) {
    let indexstr = index.toString();
    let row = this.rows.find(row => row.element.nativeElement.getAttribute(0) === indexstr);
    if (row != null) {
      let rect = row.element.nativeElement.getBoundingClientRect();
      if ((rect.y <= 0) || ((rect.y + rect.height) > height)) {
        row.element.nativeElement.scrollIntoView(false, { behavior: 'instant' });
      }
      return;
    }
    //console.log('not found');
  }

  proximoRegistro() {

    let x: number = this.dataSource.data.indexOf(this.focused);
    let l: number = this.dataSource.data.length;
    x++;
    if (x == l) {
      this.mudarPagina(1);
    } else {
      this.focused = this.dataSource.data[x];
    }
    this.atualizarBotoes();
  }

  registroAnterior() {
    let x: number = this.dataSource.data.indexOf(this.focused);
    if (x < 1) {
      this.mudarPagina(-1);

    } else {
      x--;
      this.focused = this.dataSource.data[x];

    }
    this.atualizarBotoes();
  }




  keydown(event) {
    let rect = event.target.getBoundingClientRect();
    //    let rect = event.target.getBoundingClientRect();
    let x: number = this.dataSource.data.indexOf(this.focused);
    let l: number = this.dataSource.data.length;
    //    console.log('417  valor x: ', x ,' vaor l: ', l , ' focusd: ' , JSON.stringify(this.focused) );

    //    console.log('296  datasour LENGTH: ', this.dataSource.data.length);

    if (event.ctrlKey && event.keyCode == 36) //ctrl home
    {
      this.mudarPagina((this.length * -1));
      //  console.log('controle page home ');
    } else if (event.ctrlKey && event.keyCode == 35) // ctrl end
    {
      this.irParaultimoReg = true;
      this.mudarPagina((this.length));

      //  console.log('controle end ');
    } else if (event.keyCode == 33) // page Up
    {
      this.mudarPagina(-1);
    } else if (event.keyCode == 34) // page down
    {
      this.irParaultimoReg = true;
      this.mudarPagina(1);

    } else if (event.keyCode == 38) // Up
    {
      if (x > 0) {
        this.focused = this.dataSource.data[x - 1];
      }
      else { this.mudarPagina(-1); }
    }
    else if (event.keyCode == 40) // Down
    {
      if (x < l - 1) {

        this.focused = this.dataSource.data[x + 1];

      } else { this.mudarPagina(1); }
    }
    if (this.focused != null) {
      let index: number = 0;
      for (var key in this.focused) {
        index = FuncoesGerais.toInt(`${this.focused[key]}`);
        break;
      }

      //          console.log('234 this.focused ', index );
      //            console.log('242 highlightedRows ', JSON.stringify(this.highlightedRows) );
      this.showElement(index, rect.height);
    }
  }

  actionDelete(index: number) {
    this.deleteHandler.emit(index);
  }

  mudarPagina(avancar: any) {

    if (avancar < 0 && this.pageIndex < 1) {
    } else {

      this.avancarPagina.emit(avancar);
      this.atualizarBotoes();

    }

  }



  atualizarBotoes() {
    this.visibleButton.anterior = true;
    this.visibleButton.proximo = true;
    this.visibleButton.primeiro = true;
    this.visibleButton.ultimo = true;

    let l: number = this.dataSource.data.length;
    let x: number = this.dataSource.data.indexOf(this.focused);

    let row = this.dataSource.data[x];
    //    console.log('neste momento 387 ', row, ' valor de x ', x)
    //    console.log(' valor de x ', x)

    if (this.visibleButton.ativoPrimeiraPagina == true) {
      if (x == 0) {
        this.visibleButton.primeiro = false;
        this.visibleButton.anterior = false;
      }

    }

    if (this.visibleButton.ativoUltimaPagina == true) {
      if (x == (l - 1)) {
        this.visibleButton.ultimo = false;
        this.visibleButton.proximo = false;
      }

    }
    this.positionHandler.emit({ row, x });

    this.buttonVisible.emit(this.visibleButton);
    //    console.log('323 passou no atualizar botoes x ', x, ' l ', l, ' json ', JSON.stringify(this.visibleButton));



  }

  movimentarPagina($event) {
    this.pageHandler.emit($event);

  }



  fRetornaFormatado(pValor: any, pDataMask: string, pNome: string, element) {

  //  console.log('valor do elemento ', JSON.stringify(element));

//    console.log('nome do campo 477 ', pNome, ' valor ', pValor)

    try {


      if (pValor == null || pDataMask == null) {
        return pValor;
      }


      let mValor: string = pDataMask.toLowerCase();
      switch (mValor) {
        case 'valorboolean':
          return pValor == 1 ? "SIM" : "NAO";

        case 'datetime':
          return moment(pValor).format('DD/MM/YYYY hh:mm:ss');
        case 'date':
          return moment(pValor).format('DD/MM/YYYY');
        case 'valor2dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 2);
        case 'valor3dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 3);
        case 'valor4dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 4);

        default:


          return pValor;
      }


    } catch (error) {

      console.log('erro ', error);
      return pValor;
    }
  }

  // inicio backgroud

  backGroundForm(row) {
    /*  console.log('row ', row);
      console.log('Item editando ');
      return "lightblue";
    
      let row;
    */
    let itemEditando = false;
    if (itemEditando) {
      return "'lightblue'";
    }
    else {
      return this.highlightedRows.indexOf(row == undefined ? -1 : row) != -1 ? 'lightblue' : ''
    }


  }
  // termino background


  // inicio funcoes resizing

  onResizeEnd(event: ResizeEvent, columnName): void {
    if (event.edges.right) {
      const cssValue = event.rectangle.width + 'px';
      const columnElts = document.getElementsByClassName('mat-column-' + columnName);
      for (let i = 0; i < columnElts.length; i++) {
        const currentEl = columnElts[i] as HTMLDivElement;
        currentEl.style.width = cssValue;
      }
    }
  }

  // termino funcoes resizing


}

export interface ItemTable {
  columnName: string;
  columnMask?: any;
  headerName: string;
  headerMobile?: string;
  percent?: string;
  notCenter?: boolean;
}


