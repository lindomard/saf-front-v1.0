import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ItemTable, TableListComponent} from '@base-shared/table-list/table-list.component';
import {FormControl, UntypedFormGroup} from '@angular/forms';
import {FormBuildConfig} from '@base-shared/form-build/form-build.component';
import {LicensesEntity} from '@register/domain/entities/licenses-entity.model';
import {MarkTouchedForm} from '@base-core/mark-touched-form/mark-touched-form';
import {LicensesForm, nameControlTypeLicense, TYPE_ARMY, TYPE_SANITARY} from './licenses-form';
import {formatDateToLocale, formatDateToStrngEua} from '@base-core/format-date';
import {safeCall} from '@base-core/safe-call';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LicensesComponent implements OnInit {

  @ViewChild('instanceTable', { static: false }) instanceTableList: TableListComponent;

  @Output() instanceHandler= new EventEmitter<LicensesComponent>()

  licenses: LicensesEntity[] = []

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  displayColumns: string[] = [];
  itemsTable: ItemTable[] = [];

  constructor(
    public licensesForm: LicensesForm,
    private markedTouchedForm: MarkTouchedForm,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.instanceHandler.emit(this);
    this.initialiazer()
    this.listenerClickAdd()
  }

  private initialiazer() {
    this.form = this.licensesForm.form;
    this.fields = this.licensesForm.fields;
    this.displayColumns = this.licensesForm.displayColumns;
    this.itemsTable = this.licensesForm.itemsTable;
  }


  cleanLicenses() {
    safeCall(this.instanceTableList, (it) => {
      this.licensesForm.licenses = [];
      this.licenses = [];
      it.fillDataNoPage([]);
      this.change.detectChanges();
    })
  }

  private listenerClickAdd() {
    this.licensesForm.handleClickAdd = () => {
      this.markedTouchedForm.markedFormControlTouched(this.form);
      if (!this.form.invalid && this.form.disabled === false) {
        this.addLicense();
      }
    };
  }

  private addLicense() {
    const value: LicensesEntity = this.form.getRawValue();
    value.dueDate = formatDateToLocale(value.dueDate);
    let type = value.type
    value.type = type == '0' ? TYPE_SANITARY : TYPE_ARMY;
    this.licenses.push(value);
    this.licensesForm.licenses = this.licenses;
    this.form.reset();
    this.form.get(nameControlTypeLicense).setValue(this.licensesForm.dipatchers[0].id);
    this.notifyDataChange();
  }

  onEditListener(index: number) {
    const license: LicensesEntity = this.licenses[index];
    this.licenses.splice(index, 1);
    this.licensesForm.licenses = this.licenses;
    this.notifyDataChange();
    license.dueDate = formatDateToStrngEua(license.dueDate);
    const type = license.type;
    license.type = type == TYPE_SANITARY ? '0' : '1';
    this.form.setValue(license);
  }

  onDeleteListener(index: number) {
    this.licenses.splice(index, 1);
    this.licensesForm.licenses = this.licenses;
    this.notifyDataChange();
  }

  setLicenses(licenses: LicensesEntity[]) {
    this.licensesForm.licenses = licenses;
    let data = licenses;
    const dataResult = data.map(it => {
      it = this.getTypeLabel(it);
      return it;
    });
    
    this.licenses = [...dataResult];
    this.notifyDataChange();
  }

  notifyDataChange() {
    safeCall(this.instanceTableList, (it) => {
      it.fillDataNoPage(this.licenses);
      this.getStyleShowTable();
      this.change.detectChanges();
    });
  }

  getStyleShowTable(): object {
    let result: Object = { 'visibility': 'hidden' };
    safeCall(this.licensesForm.licenses, (it) => {
      const show = (it.length > 0);
      if (show) {
        result = { 'visibility': 'visible' }
      }
    });
    return result;
  }

  private getTypeLabel(license: LicensesEntity): LicensesEntity {
    const type = Number(license.type) == 0 ? TYPE_SANITARY : TYPE_ARMY;
    license.type = type;

    return license;
  }

}
