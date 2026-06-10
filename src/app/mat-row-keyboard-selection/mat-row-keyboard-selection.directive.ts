import { SelectionModel } from '@angular/cdk/collections';
import { Directive, ElementRef, Host, HostListener, Input, OnDestroy, OnInit, Self, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRow, MatTable, MatTableDataSource } from '@angular/material/table';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[matRowKeyboardSelection]'
})
export class MatRowKeyboardSelectionDirective implements OnInit, OnDestroy, AfterViewInit, OnChanges {


  private dataSource: MatTableDataSource<any>;
  private rows: NodeListOf<HTMLElement>;
  private renderedData: any[];

  @Input('matRowKeyboardSelection') set MatRowKeyboardSelection(selection) {
    this.selection = selection;
  }

  @Input() selection: SelectionModel<any>;
  @Input() rowModel;
  @Input() toggleOnEnter = true;
  @Input() selectOnFocus = true;
  @Input() deselectOnBlur = false;
  @Input() preventNewSelectionOnTab = false;
  @Input() matTable: MatTable<any>;
  @Input() row: MatRow;
  @Input() page: FilterPaginator;

  @Output() paginaProxima = new EventEmitter<any>();
  @Output() paginaAnterior = new EventEmitter<any>();
  @Output() paginaUltima = new EventEmitter<any>();
  @Output() paginaPrimeira = new EventEmitter<any>();

  private unsubscriber$ = new Subject();



  // @Host() private matTable: MatTable<any>
  // @Host() @Self() private row: MatRow
  constructor(private el: ElementRef) { }

  ngOnInit(): void {

  }

  setarFocus() {
    if (this.renderedData) {


      /*

      console.log('rows ', this.rows.length, ' page size ', this.page.size,
      ' page page ', this.page.page, ' page total pages ', this.page.totalPages,
      ' row.length - page.size ', this.rows.length - this.page.size)
            let currentIndex = (this.renderedData.findIndex(row => row === this.rowModel)) +
      
            (0 + (this.rows.length > this.page.size ? this.page.size : 0));
      
      */
      try {

/*
        let itemSelecionado = ( this.page.page==0 
          ? (this.rows.length<=this.page.size ?  (this.page.size-1)  : 
            (this.rows.length - this.page.size) ) :

          
          (this.page.totalPages-1)) ? 0 :
        (0 + (this.rows.length > this.page.size ? this.page.size : 0)) 
*/

        let itemSelecionado = 
        (0 + (this.rows.length > this.page.size ? this.page.size : 0));
  
        if (this.page.page< this.page.totalPages-1 && 
            this.rows.length>this.page.size  && 
            this.rows.length!=this.page.size*2 ) {
          itemSelecionado = this.rows.length - this.page.size;

        } 
        
/*

rows  5  page size  5  page page  0  page total pages  4763  row.length - page.size  0
        if (this.page.page==0) {
          itemSelecionado = this.rows.length - this.page.size;
        } 

*/

//  


/*        (this.page.totalPages-1) ? 0 :
          
        (0 + (this.rows.length > this.page.size ? this.page.size : 0)) 
*/
        let newRow = 
        this.rows[itemSelecionado];
        if (newRow) {
          newRow.focus();
        }

      } catch (error) {

        let newRow = this.rows[0];
        if (newRow) {
          newRow.focus();
        }

      }

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //  && this.rowModel && this.rows && this.rows.length>0
    if (changes['rowModel']) {
      this.getTableRows();

      //      this.setarFocus();


    }
  }


  ngAfterViewInit() {
    // if (!this.selection) {
    //     throw new Error('Attribute \'selection\' is required');
    //   }
    if (!this.matTable || !this.matTable.dataSource) {
      throw new Error('MatTable [dataSource] is required');
    }
    if (!this.rowModel) {
      throw new Error('[rowModel] is required');
    }
    if (this.el.nativeElement.tabIndex < 0) {
      this.el.nativeElement.tabIndex = 0;
    }
    this.dataSource = this.matTable.dataSource as MatTableDataSource<any>;
    this.dataSource.connect().pipe(takeUntil(this.unsubscriber$)).subscribe(data => {
      this.renderedData = data;
      this.rows = this.getTableRows();
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  @HostListener('focus', ['$event']) onFocus() {
    if (this.selectOnFocus && !this.selection.isMultipleSelection()) {
      this.selection.select(this.rowModel);
    }

    if (this.selectOnFocus && this.preventNewSelectionOnTab) {
      this.rows.forEach(row => {
        if (row !== this.el.nativeElement) {
          row.tabIndex = -1;
        }
      });
    }

  }

  @HostListener('blur', ['$event']) onBlur() {
    if (this.deselectOnBlur && !this.selection.isMultipleSelection()) {
      this.selection.deselect(this.rowModel);
    }
    if (this.selectOnFocus) {
      this.el.nativeElement.tabIndex = 0;
    }
  }

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {


//    console.log('event  ', event);

    let newRow;
    let currentIndex = (this.renderedData.findIndex(row => row === this.rowModel)) +

      (0 + (this.rows.length > this.page.size ? this.page.size : 0));


    if (event.key === 'ArrowDown') {
      //      console.log('currente + 1', (currentIndex + 1), ' row length ', this.rows.length);
      newRow = this.rows[currentIndex + 1];
      if (currentIndex + 1 >= this.rows.length) {
        this.paginaProxima.emit("");

      }


    } else if (event.key === 'ArrowUp') {
      //     console.log('currente ', (currentIndex ), ' row length ', this.rows.length);

      newRow = this.rows[currentIndex - 1];
      if (currentIndex == this.page.size) {
        this.paginaAnterior.emit("");

      }

    } else if (event.key === 'PageDown' && (this.page.page < (this.page.totalPages - 1))) {
      this.paginaProxima.emit("");

    } else if (event.key === 'PageUp' && (this.page.page > 0)) {
      this.paginaAnterior.emit("");

    } else if (event.key === "End" && event.ctrlKey == true && (this.page.page < (this.page.totalPages - 1))) {
      //      console.log(' diretiva acionou contrl-End')


      this.paginaUltima.emit("");

    } else if (event.key === "Home" && event.ctrlKey == true && (this.page.page > 0)) {

      this.paginaPrimeira.emit("");


    } else if (event.key === 'Enter' || event.key === ' ') {
      if (this.toggleOnEnter) {
        this.selection.toggle(this.rowModel);
      }
      event.preventDefault();
    }
    if (newRow) {
      newRow.focus();
    }
  }

  private getTableRows() {
    try {


      let el = this.el.nativeElement;
      while (el && el.parentNode) {
        el = el.parentNode;
        if (el.tagName && el.tagName.toLowerCase() === 'mat-table' || el.hasAttribute('mat-table')) {
          this.rows = el.querySelectorAll('mat-row, tr[mat-row]');
          this.setarFocus();
          return this.rows;

        }
      }
//      this.setarFocus();
      return null;
    }
    catch (error) {
      console.log('erro ao let get tables rows ', error);

    }

  }
}
