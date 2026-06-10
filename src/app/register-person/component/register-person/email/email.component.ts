import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuildConfig, FormItemType } from 'src/app/base/base-shared/form-build/form-build.component';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import { EmailForm } from 'src/app/register-person/control-forms/email-form';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {


  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private emailForm: EmailForm
  ) { }

  ngOnInit() {
    this.form = this.emailForm.form;
    this.fields = this.emailForm.fields;
  }

}
