import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuildConfig, FormBuildComponent } from 'src/app/base/base-shared/form-build/form-build.component';
import { UntypedFormGroup } from '@angular/forms';
import { ContactForm, nameControlContactsPhone, PHONE_CONTACT } from '@register/component/register-person/general-person/contacts-person/contacts-form';
import { ItemTable, TableListComponent } from '@base-shared/table-list/table-list.component';
import { SnotifyService } from 'ng-snotify';
import { ContatoEntity } from '@register/domain/entities/contacts-entity.model';
import { MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { CategoriaSearchDataState, CategoriaErrorState } from '@register/domain/state/categoria-state';
import { Category } from '@register/data/model/category.model';
import { CategoriaDialogComponent } from '../../dialog/categoria-dialog/categoria-dialog.component';
import { safeCallOrNull, safeCall } from '@base-core/safe-call';
import { MatDialog } from '@angular/material/dialog';
import { fillForm } from '@base-core/fill-form/fill-form';
import { ContactsController } from './contacts-controller';
import { Subscription } from 'rxjs';
import { State, ShowLoading, HideLoading } from '@base-core/state/state';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import { changeMaskPhone } from '@base-core/function/change-mask-phone';

@Component({
  selector: 'app-contacts-person',
  templateUrl: './contacts-person.component.html',
  styleUrls: ['./contacts-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsPersonComponent extends ProgressBarShowComponent implements OnInit, OnDestroy {

  @ViewChild('instanceTable', { static: false }) instanceTableList: TableListComponent;
  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  @Output() instanceHandle = new EventEmitter<ContactsPersonComponent>();

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  contacts: ContatoEntity[] = [];
  displayColumns: string[] = [];
  itemsTable: ItemTable[] = [];
  private $contactsSubject: Subscription;

  constructor(
    public contactFrom: ContactForm,
    private markedTouchedForm: MarkTouchedForm,
    private contactsController: ContactsController,
    private snotify: SnotifyService,
    public dialog: MatDialog,
    private change: ChangeDetectorRef
  ) {
    super(dialog);
  }

  ngOnInit() {
    this.initialiazer();
    this.onListeneAdd();
    this.onListeneSearchCategoria();
    this.initialazerController();
    this.onListenerChangePhone();
    this.instanceHandle.emit(this);
  }

  private initialazerController() {
    this.$contactsSubject = this.contactsController.observable.subscribe(state => {
      switch (state.constructor) {
        case ShowLoading: {
          this.showLoading();
          break;
        }
        case HideLoading: {
          this.hideLoading();
          break;
        }
        case CategoriaSearchDataState: {
          this.showCategorias(state);
          break;
        }
        case CategoriaErrorState: {
          this.showError(state);
          break;
        }
      }
    });
  }

  private onListenerChangePhone() {
    this.contactFrom.handlerChangePhone = () => {
      const phone = this.contactFrom.form.get(nameControlContactsPhone).value;
      changeMaskPhone(phone, this.instanceForm, this.contactFrom.fields, PHONE_CONTACT);
    }
  }

  private showError(state: State) {
    const message = (state as CategoriaErrorState).message;
    this.snotify.error(message);
  }

  private showCategorias(state: State) {
    const result = (state as CategoriaSearchDataState).data;
    this.openDialogCategoria(result);
  }

  onListeneSearchCategoria() {
    this.contactFrom.handleSearchCategoria = () => {
      this.contactsController.fetchCatergoria();
    }
  }

  onListeneAdd() {
    this.contactFrom.handleAdd = () => {
      this.markedTouchedForm.markedFormControlTouched(this.form);
      if (this.validationContatForm()) {
        this.contacts.push(this.form.getRawValue());
        this.contactFrom.contacts = this.contacts;
        this.form.reset();
        this.notifyDataChange();
      }
    };
  }

  initialiazer() {
    this.form = this.contactFrom.form;
    this.fields = this.contactFrom.fields;
    this.displayColumns = this.contactFrom.displayColumns;
    this.itemsTable = this.contactFrom.itemsTable;
  }

  cleanContacts() {
    safeCall(this.instanceTableList, () => {
      this.contacts = [];
      this.contactFrom.contacts = [];
      this.instanceTableList.fillDataNoPage([]);
    });
  }

  setContacts(contacts: ContatoEntity[]) {
    this.contactFrom.contacts = contacts;
    const data = contacts;
    this.contacts = [...data];
    this.notifyDataChange();
  }

  private openDialogCategoria(categorias: Category[]) {
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: { categorias: categorias }
    });

    dialogRef.afterClosed().subscribe(result => {
      safeCallOrNull(result, () => {
        const form = this.contactFrom.form
        fillForm('categoria', form, result.nome);
        fillForm('idCategoria', form, result.id);
      },
        () => { });
    });
  }

  private validationContatForm(): boolean {
    let message: string[] = [];
    for (const name in this.form.controls) {
      if (this.form.controls[name].invalid) {
        message.push(name);
      }
    }
    if (this.form.invalid) {
      message.forEach(m => this.snotify.error(`Campos obrigatorios ${m}`));
      return false;
    }
    return true;
  }

  onEditListener(index: number) {
    let contato: ContatoEntity = this.contacts[index];
    this.contacts.splice(index, 1);
    this.contactFrom.contacts = this.contacts;
    this.instanceTableList.fillDataNoPage(this.contacts);
    this.form.setValue(contato);
  }

  onDeleteListener(index: number) {
    this.contacts.splice(index, 1);
    this.contactFrom.contacts = this.contacts;
    this.notifyDataChange();
  }

  notifyDataChange() {
    safeCall(this.instanceTableList, (it) => {
      it.fillDataNoPage(this.contacts);
      this.getStyleShowTable();
      this.change.detectChanges();
    });
  }

  getStyleShowTable(): object {
    let result: Object = { 'visibility': 'hidden' };
    
    safeCall(this.contactFrom.contacts, (it) => {
      const show = (it.length > 0)
      if (show) {
        result = { 'visibility': 'visible' }
      }
    });
    return result;
  }

  ngOnDestroy() {
    this.hideLoading();
    this.$contactsSubject.unsubscribe();
  }
}
