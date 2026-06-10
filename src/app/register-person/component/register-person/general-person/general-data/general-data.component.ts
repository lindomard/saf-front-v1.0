import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralDataForm } from './general-data-form';
import { changeMaskPhone } from '@base-core/function/change-mask-phone';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { nameControlPersonalPhoneGeneralData, PHONE_GENERAL_DATA } from './general-data-form';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;
  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private generalDataForm: GeneralDataForm
  ) { }

  ngOnInit() {
    this.initialazer();
    this.onListenerChagePersonalPhone();
  }

  private initialazer() {
    this.form = this.generalDataForm.form;
    this.fields = this.generalDataForm.fields;
  }

  private onListenerChagePersonalPhone() {
    this.generalDataForm.handlerPhonePersonalData = () => {
      const phone: string = this.generalDataForm.form.get(nameControlPersonalPhoneGeneralData).value;
      changeMaskPhone(phone, this.instanceForm, this.generalDataForm.fields, PHONE_GENERAL_DATA);
    }
  }
}
