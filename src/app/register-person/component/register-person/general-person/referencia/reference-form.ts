import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { EnumMask } from '@base-core/model/mask-enum.model';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { nameControlPhone, nameControlPhoneOption } from '../person/person-form';

export function instanceReferenceForm() {
  return new ReferenceForm();
}


export const nameControlName = 'name';
export const nameControlNameOption = 'nameOption';
export const nameControlCellPhone = 'cellPhone';
export const nameControlCellPhoneOption = 'cellPhoneOption';
export const nameControlRelationship = 'relationship';
export const nameControlRelationshipOption = 'relationshipOption';
export const nameControlBank = 'bank';
export const nameControlBankOption = 'bankOption';
export const nameControlAgency = 'agency';
export const nameControlAgencyOption = 'agencyOption';
export const nameControlCurrentAccount = 'currentAccount';
export const nameControlCurrentAccountOption = 'currentAccountOption';
export const nameControlManage = 'manage';
export const nameControlManageOption = 'manageOption';
export const nameControlEmailBank = 'emailBank';
export const nameControlEmailBankOption = 'emailBankOption';
export const nameControlBankPhone = 'bankPhone';
export const nameControlBankPhoneOption = 'bankPhoneOption';
export const nameControlCompany = 'company';
export const nameControlCompanyOption = 'companyOption';
export const nameControlContact = 'contact';
export const nameControlContactOption = 'contactOption';
export const nameControlCommercialPhone = 'commercialPhone';
export const nameControlCommercialPhoneOption = 'commercialPhoneOption';
export const nameControlCommercialEmail = 'commercialEmail';
export const nameControlCommercialEmailOption = 'commercialEmailOption';

export class ReferenceForm {

  public handleClickAdd: () => void;

  // tslint:disable-next-line:variable-name
  private _form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null),
    phone: new UntypedFormControl(null),
    bankPhone: new UntypedFormControl(null),
    bankPhoneOption: new UntypedFormControl(null),
    cellPhone: new UntypedFormControl(null),
    relationship: new UntypedFormControl(null),
    nameOption: new UntypedFormControl(null),
    phoneOption: new UntypedFormControl(null),
    cellPhoneOption: new UntypedFormControl(null),
    relationshipOption: new UntypedFormControl(null),
    bank: new UntypedFormControl(null),
    agency: new UntypedFormControl(null),
    currentAccount: new UntypedFormControl(null),
    phoneBank: new UntypedFormControl(null),
    manage: new UntypedFormControl(null),
    emailBank: new UntypedFormControl(null),
    bankOption: new UntypedFormControl(null),
    agencyOption: new UntypedFormControl(null),
    currentAccountOption: new UntypedFormControl(null),
    phoneBankOption: new UntypedFormControl(null),
    manageOption: new UntypedFormControl(null),
    emailBankOption: new UntypedFormControl(null),
    company: new UntypedFormControl(null),
    contact: new UntypedFormControl(null),
    commercialPhone: new UntypedFormControl(null),
    commercialEmail: new UntypedFormControl(null),
    companyOption: new UntypedFormControl(null),
    contactOption: new UntypedFormControl(null),
    commercialPhoneOption: new UntypedFormControl(null),
    commercialEmailOption: new UntypedFormControl(null), // end commercial
  });

  private clickAdd() {
    return () => this.handleClickAdd();
  }

  get form(): UntypedFormGroup {
    return this._form;
  }

  constructor() {
    this.form.disable();
  }

  get fields(): FormBuildConfig[] {
    return [
      this.loadTitlePeople(),
      this.loadName(),
      this.laodPhone(),
      this.loadCell(),
      this.loadRelation(),
      this.loadingNameOption(),
      this.laodingPhoneOption(),
      this.loadingCellOption(),
      this.loadingRelationOption(),
      this.loadingTitleBank(),
      this.loadingBank(),
      this.loadingAgency(),
      this.loadingCount(),
      this.loadingPhoneBank(),
      this.loadingManager(),
      this.loadingEmailBankOption(),
      this.loadingBankOption(),
      this.loadingAgencyOption(),
      this.loadingCountOption(),
      this.loadingPhoneBankOption(),
      this.loadingManagerOption(),
      this.loadingEmailBank(),
      this.loadingTitleCommercial(),
      this.loadingCompany(),
      this.loadingContact(),
      this.loadingPhoneCommercial(),
      this.loadingEmailCommercial(),
      this.loadingCompanyOption(),
      this.loadingContactOption(),
      this.loadingPhoneCommercialOption(),
      this.loadingEmailCommercialOption()
    ];
  }

  private loadTitlePeople(): FormBuildConfig {
    return {
      type: FormItemType.TITLE,
      params: {
        label: 'Referências Pessoais',
        margin: true
      }
    };
  }

  private loadName(): FormBuildConfig {
    return {
      control: this.form.get(nameControlName) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Nome'
      }
    };
  }

  private loadingNameOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlNameOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Nome'
      }
    };
  }

  private laodPhone(): FormBuildConfig {
    return {
      control: this.form.get(nameControlPhone) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE
      }
    };
  }

  private laodingPhoneOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlPhoneOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE
      }
    };
  }

  private loadCell(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCellPhone) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Celular',
        mask: EnumMask.CELL
      }
    };
  }

  private loadingCellOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCellPhoneOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Celular',
        mask: EnumMask.CELL
      }
    };
  }

  private loadRelation(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRelationship) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Relacionamento'
      }
    };
  }

  private loadingRelationOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRelationshipOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Relacionamento'
      }
    };
  }

  private loadingTitleBank(): FormBuildConfig {
    return {
      type: FormItemType.TITLE,
      params: {
        label: 'Referências Bancárias',
        margin: true
      }
    };
  }

  private loadingBank(): FormBuildConfig {
    return {
      control: this.form.get(nameControlBank) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Banco'
      }
    };
  }

  private loadingBankOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlBankOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Banco'
      }
    };
  }

  private loadingAgency(): FormBuildConfig {
    return {
      control: this.form.get(nameControlAgency) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Agencia'
      }
    };
  }

  private loadingAgencyOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlAgencyOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Agencia'
      }
    };
  }

  private loadingCount(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCurrentAccount) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Conta Corrente'
      }
    };
  }

  private loadingCountOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCurrentAccountOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Conta Corrente'
      }
    };
  }

  private loadingManager(): FormBuildConfig {
    return {
      control: this.form.get(nameControlManage) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Gerente'
      }
    };
  }

  private loadingManagerOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlManageOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Gerente'
      }
    };
  }

  private loadingEmailBank(): FormBuildConfig {
    return {
      control: this.form.get(nameControlEmailBank) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'E-mail'
      }
    };
  }

  private loadingEmailBankOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlEmailBankOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'E-mail'
      }
    };
  }


  private loadingPhoneBank(): FormBuildConfig {
    return {
      control: this.form.get(nameControlBankPhone) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE
      }
    };
  }

  private loadingPhoneBankOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlBankPhoneOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE
      }
    };
  }

  private loadingTitleCommercial(): FormBuildConfig {
    return {
      type: FormItemType.TITLE,
      params: {
        label: 'Referências Comerciais',
        margin: true
      }
    };
  }

  private loadingCompany(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCompany) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Empresa'
      }
    };
  }

  private loadingCompanyOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCompanyOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Empresa'
      }
    };
  }

  private loadingContact(): FormBuildConfig {
    return {
      control: this.form.get(nameControlContact) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Contato'
      }
    };
  }

  private loadingContactOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlContactOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Contato'
      }
    };
  }

  private loadingPhoneCommercial(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCommercialPhone) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE
      }
    };
  }

  private loadingPhoneCommercialOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCommercialPhoneOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE
      }
    };
  }

  private loadingEmailCommercial(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCommercialPhone) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'E-mail'
      }
    };
  }

  private loadingEmailCommercialOption(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCommercialEmailOption) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'E-mail'
      }
    };
  }

}
