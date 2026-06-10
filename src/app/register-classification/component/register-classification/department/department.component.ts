import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { DepartmentForm } from './department-form';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;

  form: FormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private departmentForm: DepartmentForm
  ) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.form = this.departmentForm.form;
    this.fields = this.departmentForm.fiels;
  }

}
