import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TableListComponent, ItemTable } from '@base-shared/table-list/table-list.component';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { SocietyForm } from '@register/component/register-person/general-person/sociedade/society-form';
import { SocietyEntity } from '@register/domain/entities/sociedade-entity.model';
import { MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { safeCall } from '@base-core/safe-call';
import { toRemoveCurrency, toCurrency } from '@base-core/state/format-currency';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocietyComponent implements OnInit {

  @ViewChild('instanceTable', { static: false }) instanceTableList: TableListComponent;
  @Output() instanceHandle = new EventEmitter<SocietyComponent>();

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  displayColumns: string[] = [];
  itemsTable: ItemTable[] = [];

  society: SocietyEntity[] = [];

  constructor(
    public societyForm: SocietyForm,
    private markedTouchedForm: MarkTouchedForm,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initialazer();
    this.onListenerAddClick();
    this.instanceHandle.emit(this);
  }

  cleanSociety() {
    safeCall(this.instanceTableList, () => {
      this.societyForm.society = [];
      this.society = [];
      this.instanceTableList.fillDataNoPage([]);
    });
  }

  private onListenerAddClick() {
    this.societyForm.handleClickAdd = () => {
      this.markedTouchedForm.markedFormControlTouched(this.form);
      if (!this.form.invalid && this.form.disabled === false) {
        this.addSociedade();
      }
    }
  }

  private addSociedade() {
    let value: SocietyEntity = this.form.getRawValue();
    value.quota = toCurrency(value.quota);
    value.capitalSocial = toCurrency(value.capitalSocial);
    const joinSignature = value.assinaturaConjunta;
    value.assinaturaConjunta = joinSignature == '0' ? "Sim": "Não";
    this.society.push(value);
    this.societyForm.society = this.society;
    this.form.reset();
    setTimeout(() => {
      this.instanceTableList.fillDataNoPage(this.society);
    });
  }

  private initialazer() {
    this.form = this.societyForm.form;
    this.fields = this.societyForm.fields;
    this.displayColumns = this.societyForm.displayColumns;
    this.itemsTable = this.societyForm.itemsTable;
  }

  onEditListener(index: number) {
    let sociedade: SocietyEntity = this.society[index];
    sociedade.quota = toRemoveCurrency(sociedade.quota);
    sociedade.capitalSocial = toRemoveCurrency(sociedade.capitalSocial);
    const joinSignature = sociedade.assinaturaConjunta;
    sociedade.assinaturaConjunta = joinSignature == 'Sim' ? '0': '1';
    this.society.splice(index, 1);
    this.societyForm.society = this.society;
    this.instanceTableList.fillDataNoPage(this.society);
    this.form.setValue(sociedade);
  }

  onDeleteListener(index: number) {
    this.society.splice(index, 1);
    this.societyForm.society = this.society;
    this.notifyDataChange();
  }

  setSocienties(socienties: SocietyEntity[]) {
    this.societyForm.society = socienties;
    const data = socienties;
    const dataResult = data.map(it => {
      it.assinaturaConjunta == '0' ? 'Sim' : 'Não';
      it.quota = toCurrency(it.quota);
      it.capitalSocial = toCurrency(it.capitalSocial);
      return it;
    });
    this.society = [...dataResult];
    this.notifyDataChange();
  }

  notifyDataChange() {
    safeCall(this.instanceTableList, (it) => {
      it.fillDataNoPage(this.society);
      this.getStyleShowTable();
      this.change.detectChanges();
    });
  }

  getStyleShowTable(): object {
    let result: Object = { 'visibility': 'hidden' };
    const isFormDisabled = !this.societyForm.form.disabled;
    safeCall(this.societyForm.society, (it) => {
      const show = (it.length > 0) && isFormDisabled;
      if (show) {
        result = { 'visibility': 'visible' }
      }
    });
    return result;
  }

}
