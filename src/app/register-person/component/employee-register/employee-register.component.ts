import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { EmployeeForm } from '@register/control-forms/employee-form';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private employeeForm: EmployeeForm
  ) {
  }

  ngOnInit() {
    this.form = this.employeeForm.form;
    this.fields = this.employeeForm.fields;
  }

}
