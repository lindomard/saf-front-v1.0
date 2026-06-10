import { Component, OnInit, ViewChild } from '@angular/core';
import { FreteForm } from '@register/control-forms/frete-form';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig, FormBuildComponent } from '@base-shared/form-build/form-build.component';

@Component({
  selector: 'app-frete',
  templateUrl: './frete.component.html',
  styleUrls: ['./frete.component.scss']
})
export class FreteComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  constructor(private freteForm: FreteForm) { }

  ngOnInit() {
    this.form = this.freteForm.form;
    this.fields = this.freteForm.fields;
  }

}
