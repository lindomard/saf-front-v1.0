import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Classificacao } from '@register/data/model/classificao.model';
import { Page } from '@base-core/model/page.model';
import { TableListComponent,ItemTable } from '@base-shared/table-list/table-list.component';
import { UntypedFormControl } from '@angular/forms';
import { FormBuildComponent, FormItemType, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ClassificacaoSearchNameUseCase } from '@register/domain/usecase/classificacao/classificacao-search-name-usecase';
import { ClassificacaoSearchIdUseCase } from '@register/domain/usecase/classificacao/classificacao-search-id-usecase';
import { ClassificacaoSearchByName, ClassificacaoSearchById } from '@register/domain/entities/classificacao-search.model';
import { ShowClassificacaoSearchByNameSate, ClassificacaoErrorState, ShowClassificacaoSearchByIdSate } from '@register/domain/state/classificacao-state';
import { SnotifyService } from 'ng-snotify';
import { safeCallOrNull } from '@base-core/safe-call';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao-dialog.component.html',
  styleUrls: ['./classificacao-dialog.component.scss']
})
export class ClassificacaoDialogComponent implements OnInit {

  @ViewChild('instanceTable', {static: true}) instanceTableList: TableListComponent;
  @ViewChild('instanceForm', {static: true}) instanceForm: FormBuildComponent;
  
  classificacoes: Array<Classificacao> = [];

  private $searchClassificacao = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<ClassificacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassificacaoDataDialog,
    private useCaseName: ClassificacaoSearchNameUseCase,
    private useCaseId: ClassificacaoSearchIdUseCase,
    private snotify: SnotifyService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.$searchClassificacao.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(text => {
      this.searchClassificacao(text);
    });

    this.instanceTableList.fillData(this.data.page);

    this.optionControl.valueChanges.subscribe(() => {
      this.instanceTableList.fillData(this.data.page);
      this.textSearchControl.reset();
    })
  }

  onClick(): void {
    this.dialogRef.close();
  }

  actionRow(row: Classificacao) {
    this.dialogRef.close(row);
  }

  listenerSearchClassificacao($event) {
    this.$searchClassificacao.next($event)
  }

  private searchClassificacao(text: string) {
    safeCallOrNull(text, () => {
      const option = this.optionControl.value;
      if (option === 0)  {
        this.searchByName(text);
      } else {
        this.searchById(text);
      }
    }, () => {
      this.instanceTableList.fillData(this.data.page);
    });
  }

  private searchByName(text: string) {
    const param: ClassificacaoSearchByName = { query: text }
    this.useCaseName.execute(param).subscribe(state => {
      switch(state.constructor) {
        case ShowClassificacaoSearchByNameSate: {
          const page = (state as ShowClassificacaoSearchByNameSate).page;
          this.instanceTableList.fillData(page);
          break;
        }
        default: {
          const error = (state as ClassificacaoErrorState).error;
          this.snotify.error(error);
          break;
        }
      }
    });
  }

  private searchById(text: string) {
    const param: ClassificacaoSearchById = { query: text }
    this.useCaseId.execute(param).subscribe(state => {
      switch(state.constructor) {
        case ShowClassificacaoSearchByIdSate: {
          const page = (state as ShowClassificacaoSearchByIdSate).page;
          this.instanceTableList.fillData(page);
          break;
        }
        default: {
          const error = (state as ClassificacaoErrorState).error;
          this.snotify.error(error);
          break;
        }
      }
    });
  }

  displayColumns: string[] = [
    'codigo',
    'nome'
  ];

  itemsTable: ItemTable[] = [
    {
      columnName: 'codigo',
      headerName: 'Código',
      percent: '20%'
    },
    {
      columnName: 'nome',
      headerName: 'Nome'
    }
  ];

  optionControl = new UntypedFormControl(0);
  textSearchControl=  new UntypedFormControl('');

  options = [
    { id: 0, name: 'Nome' },
    { id: 1, name: 'Código' },
  ];

  fields: FormBuildConfig[]  = [
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
      params: {},
      handlerChange: ($event) => this.listenerSearchClassificacao($event)
    }
  ];

}

export interface ClassificacaoDataDialog {
  classificacao: Classificacao;
  page: Page<Classificacao>;
}