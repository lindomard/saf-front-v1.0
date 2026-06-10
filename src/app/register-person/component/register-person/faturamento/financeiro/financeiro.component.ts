import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig, FormBuildComponent } from '@base-shared/form-build/form-build.component';
import { FiscalForm } from '@register/control-forms/fiscal-form';


@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  constructor(private financeiroForm: FiscalForm) { }

  ngOnInit() {
    this.form = this.financeiroForm.form;
    this.fields = this.financeiroForm.fields;
  }

}
