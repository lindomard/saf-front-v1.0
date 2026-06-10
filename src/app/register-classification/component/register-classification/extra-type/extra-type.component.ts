import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { ExtraTypeForm } from './extra-type-form';

@Component({
  selector: 'app-extra-type',
  templateUrl: './extra-type.component.html',
  styleUrls: ['./extra-type.component.scss']
})
export class ExtraTypeComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  form: FormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private extraTypeForm: ExtraTypeForm
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    this.form = this.extraTypeForm.form;
    this.fields = this.extraTypeForm.fields;
  }

}
