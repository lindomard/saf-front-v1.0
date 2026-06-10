import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { ObsGeralForm } from '@register/control-forms/obs-geral-form';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})
export class GeralComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(private obsGeralForm: ObsGeralForm) { }

  ngOnInit() {
    this.initialazer();
  }

  private initialazer() {
    this.form = this.obsGeralForm.form;
    this.fields = this.obsGeralForm.fields;
  }
}
