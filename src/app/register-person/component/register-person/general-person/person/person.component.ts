import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fillForm } from '@base-core/fill-form/fill-form';
import { changeMaskPhone } from '@base-core/function/change-mask-phone';
import { getFormBuildIndex } from '@base-core/function/form-build-index';
import { EnumMask } from '@base-core/model/mask-enum.model';
import { Page } from '@base-core/model/page.model';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { ValidationService } from '@base-core/service/validation.service';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { ShowDialogWarningComponent } from '@base-shared/dialog-warning/show-dialog-warning.component';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { ItemOptionList } from '@base-shared/input-field-button/input-field-button.component';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import {
  CIDADE,
  CPNJ_OR_CPF,
  ITEM_LIST_GRPOUP,
  nameControlAddressPerson,
  nameControlCepPerson, nameControlCityCodePerson, nameControlCityPerson, nameControlComplement, nameControlCountryPerson, nameControlNeighborhood, nameControlPhone, nameControlTypePerson, nameControlUfPerson,
  PersonForm,
  PHONE_PERSON, SELECT_TYPE_PERSON
} from '@register/component/register-person/general-person/person/person-form';
import { Category } from '@register/data/model/category.model';
import { Cidade } from '@register/data/model/cidade.model';
import { MaskBuilderCnpjOrCpf } from '@register/domain/builder/mask-cnpj-builder';
import { CategoriaErrorState, CategoriaSearchDataState } from '@register/domain/state/categoria-state';
import {
  CidadeErrorState,
  CidadeSearchArrayState,
  CidadeSearchState,
  ShowIbgeState
} from '@register/domain/state/cidade-state';
import { ClassificacaoErrorState } from '@register/domain/state/classificacao-state';
import { ShowExistCnpjOrCpf } from '@register/domain/state/register-person-state';
import { CleanAddress, ShowErrorViaCep, ShowViaCep } from '@register/domain/state/viacep-state';
import { SnotifyService } from 'ng-snotify';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CategoriaCheckDialogComponent } from '../../dialog/categoria-check/categoria-check-dialog.component';
import { CidadeDialogComponent } from '../../dialog/cidade/cidade-dialog.component';
import { PersonController } from './person-controller';


const nameControlCnpj = 'cnpj';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends ProgressBarShowComponent implements OnInit, OnDestroy {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;
  @Output() instanceHandler = new EventEmitter<PersonComponent>();

  private $subjectControler: Subscription;
  private $searchCidade = new Subject<string>();
  categoriasSelecionadas: Category[] = [];
  isUpdate = false;

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  constructor(
    private personForm: PersonForm,
    private snotify: SnotifyService,
    private personController: PersonController,
    private validationService: ValidationService,
    public dialog: MatDialog,
    private dialogWarning: ShowDialogWarningComponent,
    private maskBuilderCnpjOrCpf: MaskBuilderCnpjOrCpf
  ) {
    super(dialog);
  }

  ngOnInit() {
    this.init();
    this.searchCodRaking();
    this.onListeneClickIdCity();
    this.onListeneClickCategory();
    this.changeInputTypePessoa();
    this.onListenerChangeCidade();
    this.onListenerItemSelected();
    this.initialazerController();
    this.initalazerHandlerCep();
    this.setTypePerson(true);
    this.onListenerChangePhonePerson();

    this.onListenerVerifyCnpjOrCpf();
    this.instanceHandler.emit(this);
  }

  private initalazerHandlerCep() {
    this.personForm.handlerChangeCep = () => {
      const cep = this.form.get(nameControlCepPerson).value;
      safeCall(cep, (it) => {
        if (this.form.enabled) {
          this.personController.getCep(it);
        }
      });
    };
  }

  private initialazerController() {
    this.$subjectControler = this.personController.observable.subscribe(state => {
      switch (state.constructor) {
        case ShowLoading: {
          this.showLoading();
          break;
        }
        case HideLoading: {
          this.hideLoading();
          break;
        }
        case ClassificacaoErrorState: {
          this.showErrorClassificacao(state);
          break;
        }
        case CidadeSearchState: {
          this.showCidadeSearch(state);
          break;
        }
        case CategoriaSearchDataState: {
          this.showCategoriaSearch(state);
          break;
        }
        case CategoriaErrorState: {
          this.showErrorCategoria(state);
          break;
        }
        case CidadeSearchArrayState: {
          this.showCityArray(state);
          break;
        }
        case CidadeErrorState: {
          this.showErrorCidade(state);
          break;
        }
        case ShowViaCep: {
          this.showViaCep(state);
          break;
        }
        case ShowErrorViaCep: {
          this.snotify.error( JSON.stringify(state) );
//          this.snotify.error('Nenhum Cep encontrdo!');
          break;
        }
        case ShowIbgeState: {
          this.showIbge(state);
          break;
        }
        case CleanAddress: {
          this.cleanAddress();
          break;
        }
        case ShowExistCnpjOrCpf: {
          this.showExistCnpjOrCpf();
          break;
        }
      }
    });
  }

  private showExistCnpjOrCpf() {
    const cnpj = this.personForm.form.get(nameControlCnpj).value;
    const title = 'Aviso';
    const message = `Cliente com CNPJ/CPF <b>${cnpj}</b> <br>já existe!`;

    this.dialogWarning.show(title, message);

  }


  private onListenerVerifyCnpjOrCpf() {
    this.personForm.handlerVerifyCnpjOrCpf = () => {
      if (!this.isUpdate) {
        const control: UntypedFormControl = this.personForm.form.get(nameControlCnpj) as UntypedFormControl;
        this.personController.verifyCnpj(control);
      }
    };
  }

  private onListenerChangePhonePerson() {
    this.personForm.handlerPhonePerson = () => {
      const phone: string = this.personForm.form.get(nameControlPhone).value;
      changeMaskPhone(phone, this.instanceForm, this.personForm.fields, PHONE_PERSON);
    };
  }

  private cleanAddress() {
    this.form.get(nameControlNeighborhood).reset();
    this.form.get(nameControlComplement).reset();
    this.form.get(nameControlCityPerson).reset();
    this.form.get(nameControlCityCodePerson).reset();

  }

  private showIbge(state: State) {
    const cidade = (state as ShowIbgeState).cidade;
    this.form.get(nameControlCountryPerson).setValue(cidade.pais);
    this.setCidadeAndCode(cidade.nome, cidade.id);
  }

  private showViaCep(state: State) {
    const viaCep = (state as ShowViaCep).viacep;
    this.form.get(nameControlNeighborhood).setValue(viaCep.bairro);
    this.form.get(nameControlAddressPerson).setValue(viaCep.logradouro);
    this.form.get(nameControlCityPerson).setValue(viaCep.localidade);
    this.form.get(nameControlUfPerson).setValue(viaCep.uf);
    this.personController.getIbge(viaCep.ibge);
  }

  private showErrorClassificacao(state: State) {
    this.snotify.error((state as ClassificacaoErrorState).error.message);
  }

  private showCidadeSearch(state: State) {
    this.openDialogCidade((state as CidadeSearchState).page);
  }

  private showErrorCidade(state: State) {
    this.snotify.error((state as CidadeErrorState).message);
  }

  private showCategoriaSearch(state: State) {
    this.openDialogCategoria((state as CategoriaSearchDataState).data);
  }

  private showErrorCategoria(state: State) {
    this.snotify.error((state as CategoriaErrorState).message);
  }

  private showCityArray(state: State) {
    const cities = (state as CidadeSearchArrayState).cidades;
    const options: ItemOptionList[] = [];
    cities.forEach(c => {
      options.push({ id: c.id, value: c.nome });
    });
    setTimeout(() => {
      this.instanceForm.setInjectParamWithName(CIDADE, this.personForm.fields, { options });
    });
  }

  private onListenerItemSelected() {
    this.personForm.handleItemSelected = (item: ItemOptionList) => {
      this.setCidadeAndCode(item.value, item.id);
    };
  }

  private init() {
    this.form = this.personForm.form;
    this.fields = this.personForm.fields;
    this.$searchCidade.pipe(debounceTime(500))
      .subscribe(text => this.personController.searchCidadeByName(text));
  }

  private onListenerChangeCidade() {
    this.personForm.handleEventChangeCidade = () => {
      const name: string = this.form.get(nameControlCityPerson).value;
      if (name && name.length > 3 && this.form.enabled) {
        this.$searchCidade.next(name);
      }
    };
  }

  private changeInputTypePessoa() {
    this.personForm.handleSelectTypePessoa = () => {
      this.setTypePerson(true);
    };
  }

  setTypePerson(isCleanForm: boolean) {
    const type = this.personForm.form.get(nameControlTypePerson).value;
    if (type === 0 || type === '0') {
      this.validatorTypePersonCnpj(isCleanForm);
    } else {
      console.log('cnpj')
      this.validatorTypePersonCpf(isCleanForm);
    }
  }

  private validatorTypePersonCnpj(isCleanForm) {
    const label = 'CNPJ';
      const message = 'Informe um CNPJ válido';
      const placeholder = '00.000.000/0000';

      this.maskBuilderCnpjOrCpf
      .isCleanFormControl(isCleanForm)
      .setFields(this.personForm.fields)
      .setFormGroup(this.personForm.form)
      .setNameItemField(CPNJ_OR_CPF)
      .setMask(EnumMask.CNPJ)
      .setInstanceFormBuildComponent(this.instanceForm)
      .setLabel(label)
      .setMessage(message)
      .setNameControl(nameControlCnpj)
      .setValidator(this.validationService.cnpj)
      .setPlaceHolder(placeholder)
      .builder();
  }

  private validatorTypePersonCpf(isCleanForm) {
    const label = 'CPF';
      const message = 'Informe um CPF válido';
      const placeholder = '000.000.000-00';

      this.maskBuilderCnpjOrCpf
      .isCleanFormControl(isCleanForm)
      .setFields(this.personForm.fields)
      .setFormGroup(this.personForm.form)
      .setNameItemField(CPNJ_OR_CPF)
      .setMask(EnumMask.CPF)
      .setInstanceFormBuildComponent(this.instanceForm)
      .setLabel(label)
      .setMessage(message)
      .setNameControl(nameControlCnpj)
      .setValidator(this.validationService.cpf)
      .setPlaceHolder(placeholder)
      .builder();
  }

  private searchCodRaking() {
    this.personForm.handleClickCodRaking = () => {
      this.personController.fetchClassificacao();
    };
  }

  private onListeneClickIdCity() {
    this.personForm.handleClickIdCity = () => {
      this.personController.fetchCidade();
    };
  }

  private onListeneClickCategory() {
    this.personForm.handleClickCategory = () => {
      this.personController.fetchCatergoria();
    };
  }

  cleanItemsListGroup() {
    this.categoriasSelecionadas = [];
    const index = getFormBuildIndex(ITEM_LIST_GRPOUP, this.personForm.fields);
    // this.instanceForm.setInjectParam(index, { items: [...[]] });
  }

  private openDialogCidade(page: Page<Cidade>) {
    const idCidade = this.personForm.form.get(nameControlCityCodePerson).value;

    const dialogRef = this.dialog.open(CidadeDialogComponent, {
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: { page, id: idCidade }
    });
    dialogRef.afterClosed().subscribe(result => {
      safeCall(result, () => {
        const form = this.personForm.form;
        fillForm(nameControlCityCodePerson, form, result.id);
        fillForm(nameControlCityPerson, form, result.nome);
        fillForm(nameControlUfPerson, form, result.estado);
      });
    });
  }

  private openDialogCategoria(categorias: Category[]) {
    const dialogRef = this.dialog.open(CategoriaCheckDialogComponent, {
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: { categorias, items: this.categoriasSelecionadas }
    });

    dialogRef.afterClosed().subscribe(result => {
      safeCallOrNull(result, (it) => {
        this.categoriasSelecionadas = it;
        this.instanceForm.setInjectParamWithName(ITEM_LIST_GRPOUP, this.personForm.fields, { items: it });
        this.personForm.categories = this.categoriasSelecionadas;
      },
        () => { });
    });
  }

  private setCidadeAndCode(name: string, code: number) {
    this.form.get(nameControlCityCodePerson).setValue(code);
    this.form.get(nameControlCityPerson).setValue(name);
  }

  private cleanNameControl(name: string) {
    this.form.get(name).reset();
  }

  private getPropertyFieldIndex(name: string, typeControl: string, validation: any): number {
    this.cleanNameControl(name);
    this.form.get(name).clearValidators();
    this.form.get(name).setValidators([Validators.required, validation]);
    this.form.get(name).updateValueAndValidity();
    return getFormBuildIndex(typeControl, this.personForm.fields);
  }

  fetchClients(id) {
    console.log('Cliente id ', id);
  }

  setFocusType() {
    this.instanceForm.setFocus(SELECT_TYPE_PERSON, this.fields);
  }

  ngOnDestroy() {
    this.hideLoading();
    this.$subjectControler.unsubscribe();
  }
}
