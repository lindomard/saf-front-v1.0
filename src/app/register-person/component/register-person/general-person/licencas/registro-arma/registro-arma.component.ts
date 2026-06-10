import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { TableListComponent, ItemTable } from '@base-shared/table-list/table-list.component';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { RegistroArmaForm, nameControlTipoRegistroArma } from '@register/control-forms/registro-arma-form';
import { RegistroArmas } from '@register/data/model/registro-armas.model';
import { MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { safeCall } from '@base-core/safe-call';

@Component({
  selector: 'app-registro-arma',
  templateUrl: './registro-arma.component.html',
  styleUrls: ['./registro-arma.component.scss']
})
export class RegistroArmaComponent implements OnInit {

  @ViewChild('instanceTable', { static: false }) instanceTableList: TableListComponent;
  @Output() instanceHandle = new EventEmitter<RegistroArmaComponent>();

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  displayColumns: string[] = [];
  itemsTable: ItemTable[] = [];

  registroArmas: RegistroArmas[] = [];

  constructor(
    public registroArmaForm: RegistroArmaForm,
    private markedTouchedForm: MarkTouchedForm
  ) { }

  ngOnInit() {
    this.initialiazer();
    this.listeneClickAdd();
    this.instanceHandle.emit(this);
  }

  cleanRegistroArma() {
    safeCall(this.instanceTableList, () => {
      this.registroArmaForm.registroArmas = [];
      this.registroArmas = [];
      this.instanceTableList.fillDataNoPage([]);
    });
  }

  private listeneClickAdd() {
    this.registroArmaForm.handleClickAdd = () => {
      this.markedTouchedForm.markedFormControlTouched(this.form);
      if (!this.form.invalid && this.form.disabled === false) {
        this.addAlvara();
      }
    }
  }

  private addAlvara() {
    const value = this.form.getRawValue();
    this.registroArmas.push(value);
    this.registroArmaForm.registroArmas = this.registroArmas;
    this.form.reset();
    this.form.get(nameControlTipoRegistroArma).setValue(this.registroArmaForm.optionsTipos[0].id);
    setTimeout(() => {
      this.instanceTableList.fillDataNoPage(this.registroArmas);
    });
  }

  private initialiazer() {
    this.form = this.registroArmaForm.form;
    this.fields = this.registroArmaForm.fields;
    this.displayColumns = this.registroArmaForm.displayColumns;
    this.itemsTable = this.registroArmaForm.itemsTable;
  }

  onEditListener(index: number) {
    let armas: RegistroArmas = this.registroArmas[index];
    this.registroArmas.splice(index, 1);
    this.registroArmaForm.registroArmas = this.registroArmas;
    this.instanceTableList.fillDataNoPage(this.registroArmas);
    this.form.setValue(armas);
  }

  onDeleteListener(index: number) {
    this.registroArmas.splice(index, 1);
    this.registroArmaForm.registroArmas = this.registroArmas;
    this.instanceTableList.fillDataNoPage(this.registroArmas);
  }
}
