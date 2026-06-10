import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { SubGroupForm } from './sub-group-form';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss']
})
export class SubGroupComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  form: FormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private subGroupForm: SubGroupForm
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    this.form = this.subGroupForm.form;
    this.fields = this.subGroupForm.fields;
  }

}
