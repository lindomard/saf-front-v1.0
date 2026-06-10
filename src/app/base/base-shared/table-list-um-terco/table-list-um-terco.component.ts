import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageMatPagination } from '@base-core/model/page-mat-pagination.model';
import { Page } from '@base-core/model/page.model';
import { safeCall } from '@base-core/safe-call';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ParseFloat } from '@base-shared/funcoesGerais/function-form';
import * as moment from 'moment';

@Component({
  selector: 'app-table-list-um-terco',
  templateUrl: './table-list-um-terco.component.html',
  styleUrls: ['./table-list-um-terco.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [trigger('fadeInd', fadeIn(':enter'))]  
})
export class TableListUmTercoComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @Input() displayColumns: string[] = [];
  @Input() paginatorSize: string[] = ['3', '5', '10', '15', '20', '30', '50', '100', '500'];
  @Input() length = 0;
  @Input() itens: ItemTable;
  @Input() header = true;
  @Input() data: Array<any> = [];
  @Input() pageIndex = 0;
  @Input() pageSize = 0;
  @Input() isPaginator = true;
  keyLabel: string;

  @Output() clickRowHandler = new EventEmitter<any>();
  @Output() pageHandler = new EventEmitter<PageEvent>();
  @Output() editHandler = new EventEmitter<any>();
  @Output() viewHandler = new EventEmitter<any>();

  @Output() deleteHandler = new EventEmitter<number>();
  @Output() handlerPage = new EventEmitter<PageMatPagination>();


  selection = new SelectionModel<any>(true, []);
  itemsSelected: any[] = [];
  highlightedRows = [];

  @Output() handlerSelected = new EventEmitter<any>();

  @ViewChildren('instanceCheckbox') listCheckbox: QueryList<MatCheckbox>;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    try {
      
    this.dataSource.data = [... this.data];
  } catch (error) {
      console.log('erro 60 itens table list 1 terco ', JSON.stringify(this.itens) ,' error' , error);
  }

  }

  onRowClicked(row: any) {
    //    console.log("clicou 54")
    this.clickRowHandler.emit(row);
  }

  changeStyle(item) {
    return { 'flex': `0 0 ${item.percent};` };
  }

  changeCampo() {
    return { 'flex': `0 0 12%;` };
  }

  fillData(page: Page<any>) {
    this.isPaginator = true;
    this.pageIndex = page.pageable.pageNumber;
    //    this.pageSize = page.size;
    this.length = page.totalElements;

    this.dataSource.data = [...page.content];
    this.cd.detectChanges();
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


  actionDelete(index: number) {
    this.deleteHandler.emit(index);
  }

  getPosition(row: any, linha: number): number {

    if (row == undefined) {
      return -1;
    }
    let posicao = 0;
    //    console.log(linha, ' getposition 166', JSON.stringify(row), 'campo 0', row[posicao]);
    //    console.log(linha, 'getposition 163', JSON.stringify(row), 'campo 0', linha == undefined ? -1 : linha);
    return linha == undefined ? -1 : linha;
    //    return row.position;
  }



  fRetornaFormatado(pValor: any, pDataMask: string) {

    if (pValor == null || pValor == "" || pDataMask == null) {
      return pValor;
    }
    switch (pDataMask) {
      case 'DateTime':
        return moment(pValor).format('DD/MM/YYYY hh:mm:ss');
      case 'Date':
        return moment(pValor).format('DD/MM/YYYY');
      case 'valor2Dec':
        return ParseFloat(FuncoesGerais.toDouble(pValor),2);
      case 'valor3Dec':
         return ParseFloat(FuncoesGerais.toDouble(pValor),3);
  
//        let mValor: number = FuncoesGerais.toDouble(pValor);

//      console.log('valor entra  ', pValor, ' valor saida ', FuncoesGerais.formatFloat( FuncoesGerais.toDouble(pValor), 3, ',', '.') ); 

  //      return FuncoesGerais.formatFloat( FuncoesGerais.toDouble(pValor), 3, ',', '.');

        

          // return FuncoesGerais.prettyFloat( FuncoesGerais.toDouble(pValor),3);

//        console.log('valor entra', pValor, ' valor saida ', mValor.toFixed(2));
  //      return mValor.toFixed(2);
      default:


        return pValor;
    }

  }

}



export interface ItemTable {
  columnName: string;
  columnMask?: any;
  headerName: string;
  headerMobile?: string;
  percent?: string;
  notCenter?: boolean;
}