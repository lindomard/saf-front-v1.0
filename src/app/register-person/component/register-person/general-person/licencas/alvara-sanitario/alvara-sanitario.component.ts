import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ItemTable, TableListComponent} from '@base-shared/table-list/table-list.component';
import {UntypedFormGroup} from '@angular/forms';
import {FormBuildConfig} from '@base-shared/form-build/form-build.component';
import {AlvaraSanitarioEnity} from '@register/domain/entities/alvara-sanitario-entity.model';
import {
  AlvaraSanitarioForm,
  nameControlAlvaraSanitrioTipo
} from '@register/component/register-person/general-person/licencas/alvara-sanitario/alvara-sanitario-form';
import {MarkTouchedForm} from '@base-core/mark-touched-form/mark-touched-form';
import {safeCall} from '@base-core/safe-call';
import {formatDateToLocale, formatDateToStrngEua} from '@base-core/format-date';

@Component({
  selector: 'app-alvara-sanitario',
  templateUrl: './alvara-sanitario.component.html',
  styleUrls: ['./alvara-sanitario.component.scss']
})
export class AlvaraSanitarioComponent implements OnInit {

  @ViewChild('instanceTable', { static: false }) instanceTableList: TableListComponent;
  @Output() instanceHandle = new EventEmitter<AlvaraSanitarioComponent>();

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  displayColumns: string[] = [];
  itemsTable: ItemTable[] = [];

  alvaraSanitarios: AlvaraSanitarioEnity[] = [];

  constructor(
    public alvaraSanitarioForm: AlvaraSanitarioForm,
    private markedTouchedForm: MarkTouchedForm
  ) { }

  ngOnInit() {
    this.initialiazer();
    this.listeneClickAdd();
    this.instanceHandle.emit(this);
  }

  cleanAlvaraSanitarios() {
    safeCall(this.instanceTableList, () => {
      this.alvaraSanitarioForm.alvaraSanitarios = [];
      this.alvaraSanitarios = [];
      this.instanceTableList.fillDataNoPage([]);
    });
  }

  private listeneClickAdd() {
    this.alvaraSanitarioForm.handleClickAdd = () => {
      this.markedTouchedForm.markedFormControlTouched(this.form);
      if (!this.form.invalid && this.form.disabled === false) {
        this.addAlvara();
      }
    };
  }

  private addAlvara() {
    const value: AlvaraSanitarioEnity = this.form.getRawValue();
    value.data = formatDateToLocale(value.data);
    this.alvaraSanitarios.push(value);
    this.alvaraSanitarioForm.alvaraSanitarios = this.alvaraSanitarios;
    this.form.reset();
    this.form.get(nameControlAlvaraSanitrioTipo).setValue(this.alvaraSanitarioForm.optionsAlvara[0].id);
    setTimeout(() => {
      this.instanceTableList.fillDataNoPage(this.alvaraSanitarios);
    });
    console.log(this.alvaraSanitarios);
  }

  private initialiazer() {
    this.form = this.alvaraSanitarioForm.form;
    this.fields = this.alvaraSanitarioForm.fields;
    this.displayColumns = this.alvaraSanitarioForm.displayColumns;
    this.itemsTable = this.alvaraSanitarioForm.itemsTable;
  }

  onEditListener(index: number) {
    const alvara: AlvaraSanitarioEnity = this.alvaraSanitarios[index];
    this.alvaraSanitarios.splice(index, 1);
    this.alvaraSanitarioForm.alvaraSanitarios = this.alvaraSanitarios;
    this.instanceTableList.fillDataNoPage(this.alvaraSanitarios);
    alvara.data = formatDateToStrngEua(alvara.data);
    this.form.setValue(alvara);
  }

  onDeleteListener(index: number) {
    this.alvaraSanitarios.splice(index, 1);
    this.alvaraSanitarioForm.alvaraSanitarios = this.alvaraSanitarios;
    this.instanceTableList.fillDataNoPage(this.alvaraSanitarios);
  }
}
