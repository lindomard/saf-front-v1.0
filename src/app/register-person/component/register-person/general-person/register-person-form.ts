import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { FormItemType } from '@base-shared/form-build/form-build.component';
import { SituationClient } from '@register/domain/entities/search.entity';
import {EnumMask} from "@base-core/model/mask-enum.model";


export function instanceRegisterPeronForm() {
  return new RegisterPersonForm();
}
export const PHONE_REGISTRATION = 'PHONE_REGISTRATION';

export const INPUT_COMPANY_NAME_REGISTRATION = 'INPUT_COMPANY_NAME';

export const registerNameControlCode = 'id';
export const registerNameControlSituation = 'situation';
export const registerNameControlPhone = 'phone';
export const registerNameControlContact = 'contact';
export const registerNameControlFantasyName = 'companyName';

export class RegisterPersonForm {

  public handlerChangePhone: { (): void };
  public handlerTabEvent: { (): void };

  private registerForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    companyName: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(90)
    ]),
    situation: new UntypedFormControl(null),
    contact: new UntypedFormControl(null),
    phone: new UntypedFormControl(null)
  });

  constructor() {
    this.registerForm.disable();
  }

  get form(): UntypedFormGroup {
    return this.registerForm;
  }

  get situationOptions() {
    return [
      { id: SituationClient.Active, name: 'ATIVO' },
      { id: SituationClient.Inative, name: 'INATIVO' },
      { id: SituationClient.Pending, name: 'PENDENTE' },
      { id: SituationClient.BlackList, name: 'LISTA NEGRA' }
    ];
  }

  get fields() {
    return [
      {
        control: this.form.get(registerNameControlCode) as UntypedFormControl,
        type: FormItemType.TEXT,
        columnXl: 2,
        columnLg: 2,
        columnMd: 2,
        params: {
          label: 'Código'
        }
      },
      {
        control: this.form.get(registerNameControlFantasyName) as UntypedFormControl,
        type: FormItemType.TEXT,
        name: INPUT_COMPANY_NAME_REGISTRATION,
        columnXl: 4,
        columnLg: 4,
        columnMd: 4,
        params: {
          label: 'Nome / Razão Social'
        }
      },
      {
        control: this.form.get(registerNameControlContact) as UntypedFormControl,
        type: FormItemType.TEXT,
        columnXl: 2,
        columnLg: 2,
        columnMd: 2,
        params: {
          label: 'Contato(Nome)'
        }
      },
      {
        control: this.form.get(registerNameControlPhone) as UntypedFormControl,
        type: FormItemType.TEXT,
        name: PHONE_REGISTRATION,
        columnXl: 2,
        columnLg: 2,
        columnMd: 2,
        params: {
          label: 'Telefone',
          mask: EnumMask.PHONE
        },
        handlerChange: this.onListenerChangePhone()
      },
      {
        control: this.form.get(registerNameControlSituation) as UntypedFormControl,
        type: FormItemType.SELECT,
        columnXl: 2,
        columnLg: 2,
        columnMd: 2,
        params: {
          label: 'Situação',
          options: this.situationOptions
        },
        handlerBlur: this.onListenerTabEvent()
      },
    ];
  }

  private onListenerChangePhone() {
    return () => this.handlerChangePhone()
  }
  
  private onListenerTabEvent() {
    return () => this.handlerTabEvent();
  }

}
