import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemTable, TableListComponent } from '@base-shared/table-list/table-list.component';
import { SnotifyService } from 'ng-snotify';
import { Page } from '@base-core/model/page.model';
import { Cidade } from '@register/data/model/cidade.model';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CidadeSearchState, CidadeErrorState } from '@register/domain/state/cidade-state';
import { safeCallOrNull } from '@base-core/safe-call';
import { CidadeSearchIdUseCase } from '@register/domain/usecase/cidade/cidade-search-id-usecase';
import { CidadeSearchNamePageableUseCase } from '@register/domain/usecase/cidade/cidade-search-name-pageable-usecase';

@Component({
  selector: 'app-cidade-dialog',
  templateUrl: './cidade-dialog.component.html',
  styleUrls: ['./cidade-dialog.component.scss']
})
export class CidadeDialogComponent implements OnInit {

  @ViewChild('instanceTable', { static: true }) instanceTableList: TableListComponent;

  optionControl = new UntypedFormControl('0');
  textSearchControl = new UntypedFormControl('');
                  
  private $searchCidade = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<CidadeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CidadeDatadialog,
    private snotify: SnotifyService,
    private cidadeSearchNameUseCase: CidadeSearchNamePageableUseCase,
    private cidadeSearchIdUseCase: CidadeSearchIdUseCase
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.$searchCidade.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.searchCidade(text);
    });

    safeCallOrNull(this.data.id, () => {
      this.optionControl.setValue(this.options[1].id);
      this.searchById(this.data.id);
    }, () => {
      this.instanceTableList.fillData(this.data.page);
    })

    this.optionControl.valueChanges.subscribe(() => {
      this.instanceTableList.fillData(this.data.page);
      this.textSearchControl.reset();
    });
  }

  private searchCidade(text: string) {
    safeCallOrNull(text, () => {
      const optional = this.optionControl.value;
      switch (optional) {
        case '0': {
          this.searchByName(text);
          break;
        }
        default: {
          this.searchById(text);
          break;
        }
      }
    },
      () => {
        this.instanceTableList.fillData(this.data.page);
      })
  }

  searchById(params) {
    this.cidadeSearchIdUseCase.execute(params)
      .subscribe(state => {
        switch (state.constructor) {
          case CidadeSearchState: {
            const page = (state as CidadeSearchState).page;
            this.instanceTableList.fillData(page);
            break;
          }
          default: {
            this.textSearchControl.reset();
            const message = (state as CidadeErrorState).message;
            this.snotify.error(message);
            break;
          }
        }
      });
  }

  private searchByName(param: string) {
    this.cidadeSearchNameUseCase.execute(param)
      .subscribe(state => {
        switch (state.constructor) {
          case CidadeSearchState: {
            const page = (state as CidadeSearchState).page;
            this.instanceTableList.fillData(page);
            break;
          }
          default: {
            const message = (state as CidadeErrorState).message;
            this.snotify.error(message);
            break;
          }
        }
      });
  }

  onClick(): void {
    this.dialogRef.close();
  }

  actionRow(row: Cidade) {
    this.dialogRef.close(row);
  }

  listenerSearchClassificacao($event) {
    this.$searchCidade.next($event)
  }

  displayColumns: string[] = [
    'id',
    'nome',
    'estado'
  ];

  itemsTable: ItemTable[] = [
    {
      columnName: 'id',
      headerName: 'Código',
      percent: '20%'
    },
    {
      columnName: 'nome',
      headerName: 'Nome',
      notCenter: true
    },
    {
      columnName: 'estado',
      headerName: 'UF'
    }
  ];

  options = [
    { id: 0, name: 'Nome' },
    { id: 1, name: 'Código' },
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
      handlerChange: ($event) => this.listenerSearchClassificacao($event)
    }
  ];
}

export class CidadeDatadialog {
  page?: Page<Cidade>;
  id?: number;
}