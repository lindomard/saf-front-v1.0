import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig, FormBuildComponent } from '@base-shared/form-build/form-build.component';
import { FiscalForm } from '@register/control-forms/fiscal-form';

@Component({
  selector: 'app-fiscal',
  templateUrl: './fiscal.component.html',
  styleUrls: ['./fiscal.component.scss']
})
export class FiscalComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  constructor(private financeiroForm: FiscalForm) { }

  ngOnInit() {
    this.form = this.financeiroForm.form;
    this.fields = this.financeiroForm.fields;
  }
}
