import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '@base-core/model/page.model';
import { safeCallOrNull } from '@base-core/safe-call';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import { nameControlFilterOne, nameControlFilterTwo, nameControlSituation, nameControlValueFilterOne, nameControlValueFilterTwo, SearchPersonForm } from '@register/component/search-person/search-person-form';
import { ClienteAll, ClienteEntity } from '@register/domain/entities/cliente-entity.model';
import { ItemSearch } from '@register/domain/entities/search.entity';
import { ShowClienteState } from '@register/domain/state/register-person-state';
import { ClientSearchEntity } from '@register/domain/usecase/search/cliente-find-usecase';
import { SnotifyService } from 'ng-snotify';
import { Subject, Subscription } from 'rxjs';
import { FormBuildComponent, FormBuildConfig } from 'src/app/base/base-shared/form-build/form-build.component';
import { ItemTable, TableListComponent } from 'src/app/base/base-shared/table-list/table-list.component';
import { ControllerSearch } from './controller-search';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPersonComponent extends ProgressBarShowComponent implements OnInit, AfterContentChecked, OnDestroy {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;
  @ViewChild('instanceTable', { static: true }) instanceTableList: TableListComponent;

  @Output() instanceHandleSearch = new EventEmitter<SearchPersonComponent>();
  @Output() idClientHandler = new EventEmitter<number>();
  @Output() selectClientHandler = new EventEmitter<any>();
  private $subjectController: Subscription;

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  clientes: ClienteEntity[] = [];
  pageCliente: Page<ClienteAll>;
  itensTable: ItemTable[];
  displayColumns: string[];

  rowNameValidation = 'id';
//  readonly rowNameValidation = 'id';

  private $subjectSearch = new Subject<string>();

  private _client: ClientSearchEntity;

  constructor(
    private cd: ChangeDetectorRef,
    private snotify: SnotifyService,
    private searchPersonForm: SearchPersonForm,
    private controllerSearch: ControllerSearch,
    public dialog: MatDialog
  ) {
    super(dialog);
  }

  ngOnInit() {
    this.setupView();
    this.fetchDataSource();
    this.initialazerController();
    this.iniOnListenerSearch();
    this.instanceHandleSearch.emit(this);
  }

  private initialazerController() {
    this.$subjectController = this.controllerSearch.observableSearch.subscribe(state => {
      switch (state.constructor) {
        case ShowLoading: {
          this.showLoading();
          break;
        }
        case HideLoading: {
          this.hideLoading();
          break;
        }
        case ShowClienteState: {
          this.showClientes(state);
          break;
        }
      }
    });
  }


  private iniOnListenerSearch() {
    this.searchPersonForm.handlerSeach = () => {
      this.fetchDataSource();
    };
  }

  private showClientes(state: State) {
    const page: Page<ClienteAll> = (state as ShowClienteState).page;
    this.instanceTableList.fillData(page);
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  private setupView() {
    this.fields = this.searchPersonForm.fields;
    this.form = this.searchPersonForm.form;
    this.itensTable = this.searchPersonForm.itensTable;
    this.displayColumns = this.searchPersonForm.displayColumns;

    this.form.get(nameControlFilterOne).setValue(ItemSearch.Code);
    this.form.get(nameControlFilterTwo).setValue(ItemSearch.Code);
  }


  fetchDataSource() {
    this.controllerSearch.fetchClients(this.client);
  }

  pageAction(pageEvent: PageEvent) {
    this._client = {
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
      situation: this.getValueForm(nameControlSituation),
      filterOne: this.getValueForm(nameControlFilterOne),
      filterTwo: this.getValueForm(nameControlFilterTwo),
      valueFilterOne: this.getValueForm(nameControlValueFilterOne),
      valueFilterTwo: this.getValueForm(nameControlValueFilterTwo)
    };
    this.fetchDataSource();
  }

  onRowDoubleClicked(row: ClienteEntity) {
    this.idClientHandler.emit(row.id);
  }

  onRowClick($event) {
    this.selectClientHandler.emit($event);
  }

  get client(): ClientSearchEntity {
    return safeCallOrNull(this._client, (it: ClientSearchEntity) => {
      it.situation = this.getValueForm(nameControlSituation);
      it.filterOne = this.getValueForm(nameControlFilterOne);
      it.filterTwo = this.getValueForm(nameControlFilterTwo);
      it.valueFilterOne = this.getValueFilter(nameControlValueFilterOne);
      it.valueFilterTwo = this.getValueFilter(nameControlValueFilterTwo);
      return it;
    }, () => {
      this._client = {
        page: 0,
        size: 20,
        situation: this.getValueForm(nameControlSituation),
        filterOne: this.getValueForm(nameControlFilterOne),
        filterTwo: this.getValueForm(nameControlFilterTwo),
        valueFilterOne: this.getValueFilter(nameControlValueFilterOne),
        valueFilterTwo: this.getValueFilter(nameControlValueFilterTwo)
      };
      return this._client;
    });
  }

  private getValueForm(nameControl: string): string {
    return (this.form.get(nameControl) as UntypedFormControl).value;
  }

  private getValueFilter(nameControl: string): string {
    return safeCallOrNull(this.getValueForm(nameControl), (it) => {
      return it;
    }, () => {
      return '';
    });
  }

  ngOnDestroy() {
    this.hideLoading();
    this.$subjectController.unsubscribe();
  }
}

