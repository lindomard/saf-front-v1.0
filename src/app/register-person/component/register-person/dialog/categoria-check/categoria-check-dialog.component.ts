import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { UntypedFormControl } from '@angular/forms';
import { ItemTable, TableListComponent } from '@base-shared/table-list/table-list.component';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { Subject } from 'rxjs';
import { Category } from '@register/data/model/category.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoriaErrorState, CategoriaSearchDataState } from '@register/domain/state/categoria-state';
import { CategoriaSearchIdUseCase } from '@register/domain/usecase/categoria/categoria-search-id-usecase';
import { CategoriaSearhNameUseCase } from '@register/domain/usecase/categoria/categoria-search-name-usecase';
import { safeCallOrNull } from '@base-core/safe-call';
import { CategoriaSearchNivelUseCase } from '@register/domain/usecase/categoria/categoria-search-nivel-usecase';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria-check-dialog.component.html',
  styleUrls: ['./categoria-check-dialog.component.scss']
})
export class CategoriaCheckDialogComponent implements OnInit {
  readonly keyLabelId = 'id';

  readonly title = 'Consulta Categoria';
  categoriasSelect: Category[] = [];

  optionControl = new UntypedFormControl('0');
  textSearchControl = new UntypedFormControl('');
  private $searchCategoria = new Subject<string>();

  @ViewChild('instanceTable', { static: true }) instanceTableList: TableListComponent;

  constructor(
    public dialogRef: MatDialogRef<CategoriaCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaCheckDatadialog,
    private snotify: SnotifyService,
    private categoriaSearchIdUseCase: CategoriaSearchIdUseCase,
    private categoriaSearchNameUseCase: CategoriaSearhNameUseCase,
    private categoriaSearchNivelUseCase: CategoriaSearchNivelUseCase
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.$searchCategoria.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.searchCategoria(text);
    });

    this.setDataInTablelist(this.data.items);

    this.optionControl.valueChanges.subscribe(() => {
      this.instanceTableList.fillDataNoPage(this.data.categorias);
      this.textSearchControl.reset();
    });
  }

  private searchCategoria(text: string) {
    safeCallOrNull(text, () => {
      this.callCategoriaChoose(text);
    },
      () => {
        this.setDataInTablelist(this.categoriasSelect);
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

  private searchNivel(text: string) {
    this.categoriaSearchNivelUseCase.execute(text).subscribe(state => {
      switch (state.constructor) {
        case CategoriaSearchDataState: {
          const result = (state as CategoriaSearchDataState).data;
          this.instanceTableList.fillDataNoPage(result);
          this.instanceTableList.fillSelected(this.categoriasSelect, this.keyLabelId);
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

  private searchId(id: string) {
    this.categoriaSearchIdUseCase.execute(id).subscribe(state => {
      switch (state.constructor) {
        case CategoriaSearchDataState: {
          const result = (state as CategoriaSearchDataState).data;
          this.instanceTableList.fillDataNoPage(result);
          this.instanceTableList.fillSelected(this.categoriasSelect, this.keyLabelId);
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

  private searchName(name: string) {
    this.categoriaSearchNameUseCase.execute(name).subscribe(state => {
      switch (state.constructor) {
        case CategoriaSearchDataState: {
          const result = (state as CategoriaSearchDataState).data;
          this.instanceTableList.fillDataNoPage(result);
          this.instanceTableList.fillSelected(this.categoriasSelect, this.keyLabelId);
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

  private setDataInTablelist(itemsSelected: Category[]) {
    this.instanceTableList.fillDataNoPage(this.data.categorias);
    this.instanceTableList.fillSelected(itemsSelected, this.keyLabelId);
  }

  onClick(): void {
    this.dialogRef.close();
  }

  listenerSearchCategoria($event) {
    this.$searchCategoria.next($event)
  }

  onConfirmation() {
    this.dialogRef.close(this.categoriasSelect);
  }

  selected($event) {
    this.categoriasSelect = $event;
  }

  displayColumns: string[] = [
    'select',
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
    },
    {
      type: FormItemType.GENESIS_BUTTON,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Confirmar Itens'
      },
      clickEvent: () => this.onConfirmation()
    },
  ];

}

export interface CategoriaCheckDatadialog {
  categorias?: Category[];
  items?: Category[];
}
