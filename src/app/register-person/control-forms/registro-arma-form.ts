import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemSelect } from '@base-shared/select/select.component';
import { ItemTable } from '@base-shared/table-list/table-list.component';
import { RegistroArmas } from '@register/data/model/registro-armas.model';

export function instanceRegistroArmaForm() {
  return new RegistroArmaForm();
}

export const nameControlTipoRegistroArma = 'tipo';

export class RegistroArmaForm {
  public handleClickAdd: { (): void };

  private _registroArmas: RegistroArmas[] = [];

  private _form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    tipo: new UntypedFormControl(null),
    numero: new UntypedFormControl(null, [Validators.required]),
  });

  private clickAdd() {
    return () => this.handleClickAdd();
  }

  set registroArmas(registros: RegistroArmas[]) {
    this._registroArmas = registros;
  }

  get registroArmas(): RegistroArmas[] {
    return this._registroArmas;
  }

  get form(): UntypedFormGroup {
    return this._form;
  }

  constructor() {
    this.form.disable();
  }

  get optionsTipos(): ItemSelect[] {
    return [
      { id: 1, name: 'SIGMA' },
      { id: 2, name: 'SNARM' },
    ]
  }

  get fields(): FormBuildConfig[] {
    return [
      {
        type: FormItemType.TITLE,
        params: {
          label: 'Controles de Registro de Armas do Exercito Brasileiro'
        }
      },
      {
        control: this.form.get('tipo') as UntypedFormControl,
        type: FormItemType.SELECT,
        columnXl: 3,
        columnLg: 3,
        columnMd: 3,
        params: {
          label: 'Tipo',
          options: this.optionsTipos
        }
      },
      {
        control: this.form.get('numero') as UntypedFormControl,
        type: FormItemType.TEXT,
        columnXl: 3,
        columnLg: 3,
        columnMd: 3,
        params: {
          label: 'Número'
        }
      },
      {
        type: FormItemType.BTN_RAISED,
        columnXl: 3,
        columnLg: 3,
        columnMd: 3,
        params: {
          label: 'Adicionar',
          icon: 'user-plus',
          form: this.form
        },
        clickEvent: this.clickAdd()
      },
    ]
  }

  displayColumns: string[] = [
    'tipo',
    'numero',
    'edit',
    'delete',
  ];

  get itemsTable(): ItemTable[] {
    return [
      {
        columnName: 'tipo',
        headerName: 'Tipo',
        percent: '20%'
      },
      {
        columnName: 'numero',
        headerName: 'Número'
      }
    ];
  }
}