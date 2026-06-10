import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { FormItemType, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { ItemTable } from '@base-shared/table-list/table-list.component';
import { ContatoEntity } from '@register/domain/entities/contacts-entity.model';
import { EnumMask } from '@base-core/model/mask-enum.model';

export function instanceContactsForm() {
  return new ContactForm();
}

export const PHONE_CONTACT = 'PHONE_CONTACT';

export const nameControlContactsPhone = 'telefone';
export const nameControlContactsName = 'nome';
export const nameControlContactsFinality = 'finalidade';
export const nameControlContactsEmail = 'email';
export const nameControlContactsDepartment = 'departamento';
export const nameControlContactsCategory = 'categoria';

export class ContactForm {

  private _contacts: ContatoEntity[] = [];

  public handleSearchCategoria: { (): void };
  public handleAdd: { (): void };
  public handlerChangePhone: { (): void };
  public handleSelectItemType: { (item): void }

  private contactsForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    nome: new UntypedFormControl('', [Validators.required]),
    telefone: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    finalidade: new UntypedFormControl(''),
    tipo: new UntypedFormControl(null),
  });

  constructor() {
    this.contactsForm.disable();
  }

  set contacts(contaos: ContatoEntity[]) {
    this._contacts = contaos;
  }

  get contacts(): ContatoEntity[] {
    return this._contacts;
  }

  private clidkAdd() {
    return () => this.handleAdd();
  }

  private onListenerChangePhone() {
    return () => this.handlerChangePhone()
  }
  
  private onListenerItemSelec(item) {
    return this.handleSelectItemType(item);
  }

  get form(): UntypedFormGroup {
    return this.contactsForm;
  }

  private spanLine(): FormBuildConfig {
    return {
      type: FormItemType.SPACE,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4
    }
  }

  private loadingName(): FormBuildConfig {
    return {
      control: this.form.get(nameControlContactsName) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Contato',
      }
    }
  }

  private loadingPhone(): FormBuildConfig {
    return {
      control: this.form.get(nameControlContactsPhone) as UntypedFormControl,
      type: FormItemType.TEXT,
      name: PHONE_CONTACT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Telefone',
        mask: EnumMask.PHONE
      },
      handlerChange: this.onListenerChangePhone()
    }
  }

  private loadingEmail(): FormBuildConfig {
    return {
      control: this.form.get(nameControlContactsEmail) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'E-mail'
      }
    }
  }

  private loadingFinality(): FormBuildConfig {
    return {
      control: this.form.get(nameControlContactsFinality) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Finalidade'
      }
    }
  }

  private loadingButtonAdd(): FormBuildConfig {
    return {
      type: FormItemType.BTN_RAISED,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Adicionar',
        icon: 'user-plus',
        form: this.form
      },
      clickEvent: this.clidkAdd()
    }
  }

  private loadingType(): FormBuildConfig {
    return {
      control: this.form.get('tipo') as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Tipo',
        // options: this.optionsNetwork,
        name: 'type',
        icon: 'search'
      },
      handlerSelected: (item) => this.onListenerItemSelec(item)
    }
  }

  get fields(): FormBuildConfig[] {
    return [
      this.loadingName(),
      this.loadingType(),
      this.spanLine(),
      this.loadingEmail(),
      this.loadingPhone(),
      this.loadingFinality(),
      this.loadingButtonAdd()
    ];
  }

  displayColumns: string[] = [
    'nome',
    'tipo',
    'email',
    'telefone',
    'finalidade',
    'delete',
    'edit'
  ];

  itemsTable: ItemTable[] = [
    {
      columnName: 'nome',
      headerName: 'Contato',
    },
    {
      columnName: 'tipo',
      headerName: 'Tipo',
    },
    {
      columnName: 'email',
      headerName: 'E-mail',
      percent: '25%'
    },
    {
      columnName: 'telefone',
      headerName: 'Telefone',
    },
    {
      columnName: 'finalidade',
      headerName: 'Finalidade',
    },
  ];


}
