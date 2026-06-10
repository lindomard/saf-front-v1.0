import { Component, OnInit } from '@angular/core';
import { ClassificacaoForm } from '@register/control-forms/classificacao-form';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(private checkboxForm: ClassificacaoForm) { }

  ngOnInit() {
    this.form = this.checkboxForm.form;
    this.fields = this.checkboxForm.fields;
  }

}
