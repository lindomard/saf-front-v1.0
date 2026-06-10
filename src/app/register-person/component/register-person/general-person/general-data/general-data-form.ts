import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {FormBuildConfig, FormItemType} from '@base-shared/form-build/form-build.component';
import {EnumMask} from '@base-core/model/mask-enum.model';
import {ValidationService} from '@base-core/service/validation.service';

export function instanceGeneralDataForm(validationService: ValidationService) {
  return new GeneralDataForm(validationService);
}

export const PHONE_GENERAL_DATA = 'PHONE_PERSONAL_DATA';

export const nameControlPersonalPhoneGeneralData = 'personalPhone';
export const nameControlWorkCardGeneralData = 'workCard';
export const nameControlCompanyGeneralData = 'company';
export const nameControlDateOfBithGeneralData =  'dateOfBirth';
export const nameControlRgGeneralData = 'rg';
export const nameControlRgHusbandGeneralData = 'rgHusband';
export const nameControlEmailGeneralData = 'email';
export const nameControlHusbandGeneralData = 'husband';
export const nameControlProfessionGeneralData = 'profession';
export const nameControlCpfHusbanGeneralData = 'cpfHusband';
export const nameControlPhoneHusbandGeneralData = 'phoneHusband';
export const  nameControlCellHusbandGeneralData = 'cellHusband';
export const nameControlWorkPlaceSpouseGeneralData = 'workPlaceSpouse';
export const nameControlEmailHusbandGeneralData = 'emailHusband';

export class GeneralDataForm {

  constructor(private validationService: ValidationService) {
    this.form.disable();
  }

  private generalDataForm = new UntypedFormGroup({
    profession: new UntypedFormControl(null, [
      Validators.maxLength(60)
    ]),
    workCard: new UntypedFormControl(null, [
      Validators.maxLength(15)
    ]),
    company: new UntypedFormControl(null, [
      Validators.maxLength(60)
    ]),
    dateOfBirth: new UntypedFormControl(null),
    rg: new UntypedFormControl(null, [
      Validators.maxLength(100)
    ]),
    personalPhone: new UntypedFormControl('', [
      Validators.maxLength(60)
    ]),
    email: new UntypedFormControl(null),
    husband: new UntypedFormControl(null),
    cpfHusband: new UntypedFormControl(null, [this.validationService.cpf]),
    rgHusband: new UntypedFormControl(null, [
      Validators.maxLength(100)
    ]),
    workPlaceSpouse: new UntypedFormControl(null, [
      Validators.maxLength(60)
    ]),
    phoneHusband: new UntypedFormControl(null),
    cellHusband: new UntypedFormControl(null),
    emailHusband: new UntypedFormControl(null),
  });

  public handlerPhonePersonalData: () => void;

  get form(): UntypedFormGroup {
    return this.generalDataForm;
  }

  private onListenerChangePhonePersonalData() {
    return () => this.handlerPhonePersonalData();
  }

  get fields(): FormBuildConfig[] {
    return [
      this.loadTitle(),
      this.loadProfession(),
      this.loadBorneDate(),
      this.loadRg(),
      this.loadCardWork(),
      this.loadPersonalPhone(),
      this.loadCompany(),
      this.loadEmail(),
      this.loadTitleHusband(),
      this.loadHusband(),
      this.loadCpfHusband(),
      this.loadRgHusband(),
      this.loadPhoneHusband(),
      this.loadCellHusband(),
      this.loadPlaceWorkSpouse(),
      this.loadEmailHusband()
    ];
  }

  private loadTitle(): FormBuildConfig {
    return {
      type: FormItemType.TITLE,
      params: {
        label: 'Dados Pessoais',
        margin: true,
        marginStart: true
      }
    };
  }

  private loadProfession(): FormBuildConfig {
    return {
      control: this.form.get(nameControlProfessionGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Profissão',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadBorneDate(): FormBuildConfig {
    return {
      control: this.form.get(nameControlDateOfBithGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Dt. Nascimento',
        message: 'Campo obrigatório',
        type: 'date'
      }
    };
  }

  private loadRg(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRgGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'RG/Emissor',
        message: 'Dever ter no máximo (14). Digitados: ',
        showCount: true
      }
    };
  }

  private loadCardWork(): FormBuildConfig {
    return {
      control: this.form.get(nameControlWorkCardGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Cart. Trabalho',
        type: 'number',
        message: 'Dever ter no máximo (15). Digitados: ',
        showCount: true
      }
    };
  }

  private loadPersonalPhone(): FormBuildConfig {
    return {
      control: this.form.get(nameControlPersonalPhoneGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      name: PHONE_GENERAL_DATA,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE,
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      },
      handlerChange: this.onListenerChangePhonePersonalData()
    };
  }

  private loadCompany(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCompanyGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 6,
      columnLg: 6,
      columnMd: 6,
      params: {
        label: 'Empresa',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadEmail(): FormBuildConfig {
    return {
      control: this.form.get(nameControlEmailGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 6,
      columnLg: 6,
      columnMd: 6,
      params: {
        label: 'E-mail'
      }
    };
  }

  private loadTitleHusband(): FormBuildConfig {
    return {
      type: FormItemType.TITLE,
      params: {
        label: 'Cônjugue',
        margin: true,
        marginStart: true
      }
    };
  }

  private loadHusband(): FormBuildConfig {
    return {
      control: this.form.get(nameControlHusbandGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Cônjugue'
      }
    };
  }

  private loadCpfHusband(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCpfHusbanGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'CPF',
        mask: EnumMask.CPF,
        message: 'Informe um CPF válido'
      }
    };
  }

  private loadRgHusband(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRgHusbandGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'RG/Emissor',
        message: 'Dever ter no máximo (14). Digitados: ',
        showCount: true
      }
    };
  }

  private loadPhoneHusband(): FormBuildConfig {
    return {
      control: this.form.get(nameControlPhoneHusbandGeneralData) as UntypedFormControl,
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

  private loadCellHusband(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCellHusbandGeneralData) as UntypedFormControl,
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

  private loadPlaceWorkSpouse(): FormBuildConfig {
    return {
      control: this.form.get(nameControlWorkPlaceSpouseGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 6,
      columnLg: 6,
      columnMd: 6,
      params: {
        label: 'Local Trabalho',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadEmailHusband(): FormBuildConfig {
    return {
      control: this.form.get(nameControlEmailHusbandGeneralData) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 6,
      columnLg: 6,
      columnMd: 6,
      params: {
        label: 'E-mail'
      }
    };
  }
}
