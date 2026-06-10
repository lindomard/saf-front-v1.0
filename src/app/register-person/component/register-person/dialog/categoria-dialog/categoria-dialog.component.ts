import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '@register/data/model/category.model';
import { SnotifyService } from 'ng-snotify';
import { CategoriaSearchIdUseCase } from '@register/domain/usecase/categoria/categoria-search-id-usecase';
import { CategoriaSearhNameUseCase } from '@register/domain/usecase/categoria/categoria-search-name-usecase';
import { CategoriaSearchNivelUseCase } from '@register/domain/usecase/categoria/categoria-search-nivel-usecase';
import { UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { safeCallOrNull } from '@base-core/safe-call';
import { CategoriaSearchDataState, CategoriaErrorState } from '@register/domain/state/categoria-state';
import { TableListComponent, ItemTable } from '@base-shared/table-list/table-list.component';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';

@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.scss']
})
export class CategoriaDialogComponent implements OnInit {

  @ViewChild('instanceTable', { static: true }) instanceTableList: TableListComponent;

  readonly title = 'Consulta Categoria';
  categoriasSelect: Category[] = [];

  optionControl = new UntypedFormControl('0');
  textSearchControl = new UntypedFormControl('');
  private $searchCategoria = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<CategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaDataDialog,
    private snotify: SnotifyService,
    private categoriaSearchIdUseCase: CategoriaSearchIdUseCase,
    private categoriaSearchNameUseCase: CategoriaSearhNameUseCase,
    private categoriaSearchNivelUseCase: CategoriaSearchNivelUseCase
  ) { }

  ngOnInit() {
    this.$searchCategoria.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.searchCategoria(text);
    });

    this.instanceTableList.fillDataNoPage(this.data.categorias);
  }

  private searchCategoria(text: string) {
    safeCallOrNull(text, () => {
      this.callCategoriaChoose(text);
    },
      () => {
        this.instanceTableList.fillDataNoPage(this.data.categorias);
      });
  }

  private callCategoriaChoose(text: string) {
    switch (this.optionControl.value) {
      case '0': {
        this.searchId(text);
        break;
      }
      case '1': {
        this.searchNivel(text);
        break;
      }
      default: {
        this.searchName(text);
        break;
      }
    }
  }

  private searchId(id: string) {
    this.categoriaSearchIdUseCase.execute(id).subscribe(state => {
      switch (state.constructor) {
        case CategoriaSearchDataState: {
          const result = (state as CategoriaSearchDataState).data;
          this.instanceTableList.fillDataNoPage(result);
          break;
        }
        default: {
          this.textSearchControl.reset();
          const message = (state as CategoriaErrorState).message;
          this.snotify.error(message);
          break;
        }
      }
    });
  }

  private searchNivel(text: string) {
    this.categoriaSearchNivelUseCase.execute(text).subscribe(state => {
      switch (state.constructor) {
        case CategoriaSearchDataState: {
          const result = (state as CategoriaSearchDataState).data;
          this.instanceTableList.fillDataNoPage(result);
          break;
        }
        default: {
          const message = (state as CategoriaErrorState).message;
          this.snotify.error(message);
          break;
        }
      }
    });
  }

  private searchName(name: string) {
    this.categoriaSearchNameUseCase.execute(name).subscribe(state => {
      switch (state.constructor) {
        case CategoriaSearchDataState: {
          const result = (state as CategoriaSearchDataState).data;
          this.instanceTableList.fillDataNoPage(result);
          break;
        }
        default: {
          const message = (state as CategoriaErrorState).message;
          this.snotify.error(message);
          break;
        }
      }
    });
  }

  onClick(): void {
    this.dialogRef.close();
  }

  rowSelected(row: Category) {
    this.dialogRef.close(row);
  }

  listenerSearchCategoria($event) {
    this.$searchCategoria.next($event)
  }


  displayColumns: string[] = [
    'id',
    'nivel',
    'nome',
    'indexador',
  ];

  itemsTable: ItemTable[] = [
    {
      columnName: 'id',
      headerName: 'Código',
      percent: '20%'
    },
    {
      columnName: 'nivel',
      headerName: 'Nível',
      percent: '20%'
    },
    {
      columnName: 'nome',
      headerName: 'Categoria',
      notCenter: true
    },
    {
      columnName: 'indexador',
      headerName: 'Indexador',
      percent: '20%'
    },
  ];

  options = [
    { id: 0, name: 'Código' },
    { id: 1, name: 'Nível' },
    { id: 2, name: 'Descrição' },
  ];

  fields: FormBuildConfig[] = [
    {
      control: this.optionControl,
      type: FormItemType.SELECT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Consultar por',
        options: this.options
      }
    },
    {
      control: this.textSearchControl,
      type: FormItemType.TEXT,
      columnXl: 8,
      columnLg: 8,
      columnMd: 8,
      params: {
      },
      handlerChange: ($event) => this.listenerSearchCategoria($event)
    }
  ];

}

export interface CategoriaDataDialog {
  categorias?: Category[];
}