

import { Injectable } from '@angular/core';
import { AsyncValidatorFn, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { getFormBuildIndex } from '@base-core/function/form-build-index';
import { EnumMask } from '@base-core/model/mask-enum.model';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';


@Injectable()
export class MaskBuilderCnpjOrCpf {

  private mask: EnumMask;
  private nameControl: string;
  private nameItemField: string;
  private validator: ValidationErrors;

  private asyncValidator: AsyncValidatorFn;


  private placeholder: string;
  private label: string;
  private message: string;
  private instanceForm: FormBuildComponent;
  private form: UntypedFormGroup;
  private fields: FormBuildConfig[] = [];
  private isClean = false;


  setMask(mask: EnumMask): MaskBuilderCnpjOrCpf {
    this.mask = mask;
    return this;
  }




  setNameControl(nameControl: string): MaskBuilderCnpjOrCpf {
    this.nameControl = nameControl;
    return this;
  }

  setNameItemField(nameItemField: string) {
    this.nameItemField = nameItemField;
    return this;
  }

  setValidator(validator: ValidationErrors): MaskBuilderCnpjOrCpf {
    this.validator = validator;
    return this;
  }

  setAsyncValidator(asyncValidator: AsyncValidatorFn): MaskBuilderCnpjOrCpf {
    this.asyncValidator = asyncValidator;
    return this;

  }

  //    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null

  setPlaceHolder(placeholder: string): MaskBuilderCnpjOrCpf {
    this.placeholder = placeholder;
    return this;
  }

  setLabel(label: string): MaskBuilderCnpjOrCpf {
    this.label = label;
    return this;
  }

  setMessage(message: string): MaskBuilderCnpjOrCpf {
    this.message = message;
    return this;
  }

  setInstanceFormBuildComponent(instanceForm: FormBuildComponent): MaskBuilderCnpjOrCpf {
    this.instanceForm = instanceForm;
    return this;
  }

  setFormGroup(form: UntypedFormGroup): MaskBuilderCnpjOrCpf {
    this.form = form;
    return this;
  }

  setInstanceForm(form: UntypedFormGroup): MaskBuilderCnpjOrCpf {
    this.form = form;
    return this;
  }


  setFields(fields: FormBuildConfig[]): MaskBuilderCnpjOrCpf {
    this.fields = fields;
    return this;
  }

  isCleanFormControl(isClear: boolean): MaskBuilderCnpjOrCpf {
    this.isClean = isClear;
    return this;
  }

  builder() {
    setTimeout(() => {
      const index = this.getPropertyFieldIndex(this.nameControl, this.nameItemField, this.validator);
      this.instanceForm.setInjectParam(index,
        
        {
        label: this.label,
        mask: this.mask,
        placeholder: this.placeholder,
        message: this.message
      });
    });
  }

  private getPropertyFieldIndex(name: string, nameItemField: string, validation: any): number {
    if (this.isClean) {
      this.cleanNameControl(name);
    }
// inicio teste


// termino teste

    this.form.get(name).clearValidators();
    if (validation==null) {
      this.form.get(name).setValidators([Validators.required]);
    } else {
      this.form.get(name).setValidators([Validators.required, validation]);
    }
    this.form.get(name).setAsyncValidators(this.asyncValidator);


    this.form.get(name).updateValueAndValidity();
    return getFormBuildIndex(nameItemField, this.fields);
  }

  private cleanNameControl(name: string) {
    this.form.get(name).reset();
  }

}
