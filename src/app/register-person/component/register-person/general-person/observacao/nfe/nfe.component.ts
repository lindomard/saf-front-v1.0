import { Component, OnInit } from '@angular/core';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { UntypedFormGroup } from '@angular/forms';
import { ObsNfeForm } from '@register/control-forms/obs-nfe-form';

@Component({
  selector: 'app-nfe',
  templateUrl: './nfe.component.html',
  styleUrls: ['./nfe.component.scss']
})
export class NfeComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(private obsNfeForm: ObsNfeForm) { }

  ngOnInit() {
    this.initialazer();
  }

  private initialazer() {
    this.form = this.obsNfeForm.form;
    this.fields = this.obsNfeForm.fields;
  }
}
