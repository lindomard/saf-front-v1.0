import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { TypeForm } from './type-form';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  form: FormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private typeForm: TypeForm
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    this.form = this.typeForm.form;
    this.fields = this.typeForm.fields;
  }

}
