import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { slideInAnimation } from '@base-core/animation/slide-animation';
import { safeCall, safeCallOrNull, withCall } from '@base-core/safe-call';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { ContactForm } from '@register/component/register-person/general-person/contacts-person/contacts-form';
import { GeneralDataForm } from "@register/component/register-person/general-person/general-data/general-data-form";
import { ImageForm } from '@register/component/register-person/general-person/image-register/image-form';
import {
  AlvaraSanitarioForm,
  nameControlAlvaraSanitrioTipo
} from '@register/component/register-person/general-person/licencas/alvara-sanitario/alvara-sanitario-form';
import { nameControlDateRegistration, nameControlFinalConsumer, nameControlTypePerson, PersonForm } from '@register/component/register-person/general-person/person/person-form';
import {
  registerNameControlCode,
  registerNameControlSituation,
  RegisterPersonForm
} from '@register/component/register-person/general-person/register-person-form';
import { SocietyForm } from '@register/component/register-person/general-person/sociedade/society-form';
import { ObsGeralForm } from '@register/control-forms/obs-geral-form';
import { ObsNfeForm } from '@register/control-forms/obs-nfe-form';
import { ObsPedidoForm } from '@register/control-forms/obs-pedido-form';
import { nameControlTipoRegistroArma, RegistroArmaForm } from '@register/control-forms/registro-arma-form';
import { ClienteEntity } from '@register/domain/entities/cliente-entity.model';
import { ImageRegisterMapper } from '@register/domain/mapper/image-register-mapper';
import {
  ErrorFormRegisterPerson,
  ErrorRegisterPerson,
  ShowErrorPerson,
  ShowPersonEdit,
  SuccessSaveResgiter
} from '@register/domain/state/register-person-state';
import { ImageData } from '@register/domain/usecase/imagem/image-save-use-case.service';
import { PersonDataSave } from '@register/domain/usecase/register-use-case.service';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
import { Subscription } from 'rxjs';
import { ImageRegisterForm, imageRegisterFormNameControlIdDocType } from '../register-person/general-person/image-register/image-register-form';
import { LicensesForm } from '../register-person/general-person/licencas/licenses-form';
import { SocialNetworkForm } from '../register-person/general-person/redes-sociais/social-network-form';
import { ReferenceForm } from '../register-person/general-person/referencia/reference-form';
import { SocietyComponent } from '../register-person/general-person/sociedade/society.component';
import { RegisterPersonComponent } from '../register-person/register-person.component';
import { SearchPersonComponent } from '../search-person/search-person.component';
import { PanelController } from './panel-controller';






export enum TabPenalName {
  TAB_SEARCH = 0,
  TAB_REGISTER = 1,
  TAB_REPORT = 2
}

@Component({
  selector: 'app-panel-person',
  templateUrl: './panel-person.component.html',
  styleUrls: ['./panel-person.component.scss'],
  animations: [slideInAnimation]
})
export class PanelPersonComponent implements OnInit, OnDestroy {

  constructor(
    private registerForm: RegisterPersonForm,
    private personForm: PersonForm,
    private contactsForm: ContactForm,
    private socialNetworkForm: SocialNetworkForm,
    private referenciaForm: ReferenceForm,
    private alvaraSanitarioForm: AlvaraSanitarioForm,
    private registroArmaForm: RegistroArmaForm,
    private societyForm: SocietyForm,
    private obsGeralForm: ObsGeralForm,
    private obsPedidoForm: ObsPedidoForm,
    private obsNefForm: ObsNfeForm,
    private imageForm: ImageForm,
    private imageRegisterForm: ImageRegisterForm,
    private generalDataForm: GeneralDataForm,
    private licensesForm: LicensesForm,
    private panelController: PanelController,
    private snotify: SnotifyService,
    public dialog: MatDialog,
    readonly imageMapper: ImageRegisterMapper
  ) {
//    super(dialog);
  }

  private get clientDataSave(): PersonDataSave {
    return {
      general: this.registerForm.form,
      person: this.personForm.form,
      category: this.personForm.categories,
      contacts: this.contactsForm.contacts,
      socialNetwork: this.socialNetworkForm.socialNetwork,
      referencePerson: this.referenciaForm.form.getRawValue(),
      licenses: this.licensesForm.licenses,
      gunRegistration: this.registroArmaForm.registroArmas,
      societies: this.societyForm.society,
      imageData: this.getImageData(),
      generalDate: this.generalDataForm.form.getRawValue()
    };
  }

  instanceRegisterComponent: RegisterPersonComponent;
  instanceSearchComponent: SearchPersonComponent;
  instanceSocietyComponent: SocietyComponent;

  selectedTab = new UntypedFormControl(TabPenalName.TAB_SEARCH);
  selectClient: ClienteEntity;
  isNewOrEditCliente = false;

  mode: ProgressSpinnerMode = 'indeterminate';
  isProgress = false;
  private $controllerSubject: Subscription;

  isDisableButtonNew = false;
  isDisableButtonSave = true;
  isDisableButtonCancel = true;
  isDisableButtonUpdate = true;
  isDisableButtonDelete = true;
  isFetchPerson = false;

  private static fillDayRegister(form: UntypedFormGroup) {
    const control = form.get(nameControlDateRegistration) as UntypedFormControl;
    control.disable();
    const day = moment(new Date());
    const formatValue = day.format('DD/MM/YYYY');
    control.setValue(formatValue, { emitEvent: true });
  }

  ngOnInit() {
    this.initController();
  }

  private initController() {
    this.$controllerSubject = this.panelController.observable.subscribe(state => {
      switch (state.constructor) {
        case ShowLoading: {
  //        this.showLoading();
          break;
        }
        case HideLoading: {
    //      this.hideLoading();
          break;
        }
        case SuccessSaveResgiter: {
          this.showSuccessSave(state);
          break;
        }
        case ShowPersonEdit: {
          this.setValueForm(state);
          break;
        }
        case ErrorFormRegisterPerson: {
          this.showErrorForm(state);
          break;
        }
        case ErrorRegisterPerson: {
          this.showError(state);
          break;
        }
        case ShowErrorPerson: {
          this.showError(state);
          break;
        }
      }
    });
  }

  private setValueForm(state: State) {
    this.isFetchPerson = true;
    const person = (state as ShowPersonEdit).data;
    this.personForm.form.setValue(person.client);
    this.registerForm.form.setValue(person.clientHeader);
    this.instanceRegisterComponent.setTypePeson();
    this.generalDataForm.form.setValue(person.generalData);
    this.referenciaForm.form.setValue(person.reference);
    this.instanceRegisterComponent.setFileData(person.images);

    safeCall(person.socialNetworks, (it) => {
      this.instanceRegisterComponent.setSocialNetworks(it);
    });

    safeCall(person.contacts, (it) => {
      this.instanceRegisterComponent.setContacts(it);
    });

    safeCall(person.licenses, (it) => {
      this.instanceRegisterComponent.setLicenses(it);
    });

    safeCall(person.society, (it) => {
      this.instanceRegisterComponent.setSocienties(it);
    });
  }

  private showError(state: State) {
    this.snotify.error((state as ErrorRegisterPerson).param);
  }

  private showErrorForm(state: State) {
    this.snotify.error((state as ErrorFormRegisterPerson).param);
  }

  private showSuccessSave(state: State) {
    // this.selectClient = null;
    this.snotify.success((state as SuccessSaveResgiter).param);
    this.showBtnNew();
    this.cleanFormsAndSelectTabSearch();
    this.instanceSearchComponent.fetchDataSource();
    this.cleanForms();
  }

  actionNew() {
    this.isNewOrEditCliente = true;
    this.instanceRegisterComponent.setFocusNameCompany();

    this.showSaveAndCancel();
    this.selectedTab.setValue(TabPenalName.TAB_REGISTER);
    setTimeout(() => {
      this.enableForms();
      this.setValueSituation();
      this.setValueType();
      this.setValuefinalConsumer();
      this.setValueDataRegister();
      this.cleanForms();
    });
  }

  actionCancel() {
    this.isNewOrEditCliente = false;
    this.isDisableButtonNew = false;
    this.isDisableButtonSave = true;
    this.isDisableButtonCancel = true;
    if(this.selectClient === null) {
      this.isDisableButtonDelete = true;
      this.isDisableButtonUpdate = true;
    }
    this.cleanFormsAndSelectTabSearch();
  }

  private enableForms() {
    this.enableFormLicense();
    this.enableFormRegister();
    this.enableFormContacts();
    this.enableFormSocialNetwork();
    this.enableFormReferencia();
    this.enableFormAlvaraSanitario();
    this.enableFormRegistroArma();
    this.enableFormSociedade();
    this.enableFormObs();
    this.enableFormImage();
    this.enableFormImageRegister();
    this.enableFormGeneralData();
  }

  private enableFormImage() {
    this.imageForm.form.enable();
  }

  private enableFormImageRegister() {
    this.imageRegisterForm.form.enable();
  }

  private enableFormObs() {
    this.obsGeralForm.form.enable();
    this.obsNefForm.form.enable();
    this.obsPedidoForm.form.enable();
  }

  enableFormSociedade() {
    this.societyForm.form.enable();
  }

  private enableFormRegistroArma() {
    this.registroArmaForm.form.enable();
    this.registroArmaForm.form.get(nameControlTipoRegistroArma).setValue(this.registroArmaForm.optionsTipos[0].id);
  }

  private enableFormAlvaraSanitario() {
    this.alvaraSanitarioForm.form.enable();
    this.alvaraSanitarioForm.form.get(nameControlAlvaraSanitrioTipo).setValue(this.alvaraSanitarioForm.optionsAlvara[0].id);
  }

  private enableFormReferencia() {
    this.referenciaForm.form.enable();
  }

  private enableFormSocialNetwork() {
    this.socialNetworkForm.form.enable();
  }

  private enableFormLicense() {
    this.licensesForm.form.enable();
  }

  private enableFormRegister() {
    this.registerForm.form.enable();

    this.personForm.form.enable();
//    this.personForm.form.get(nameControlUfPerson).disable();
   // this.personForm.form.get(nameControlCountryPerson).disable();
  //  this.personForm.form.get(nameControlCityPerson).disable();
  }

  private setValueSituation() {
    this.registerForm.form.get(registerNameControlSituation).setValue(this.registerForm.situationOptions[0].id);
  }

  private setValueType() {
    this.personForm.form.get(nameControlTypePerson).setValue(this.personForm.optionsTypePerson[0].id);
  }

  private setValuefinalConsumer() {
    this.personForm.form.get(nameControlFinalConsumer).setValue(this.personForm.optionsFinalConsumer[0].id);
  }

  private setValueDataRegister() {
    PanelPersonComponent.fillDayRegister(this.personForm.form);
  }

  private enableFormGeneralData() {
    this.generalDataForm.form.enable();
  }

  private enableFormContacts() {
    this.registerForm.form.get(registerNameControlCode).disable();
    this.contactsForm.form.enable();
  }

  actionSave() {
    this.isNewOrEditCliente = false;
    this.panelController.save(this.clientDataSave);
  }

  actionUpdate() {
    this.selectedTab.setValue(TabPenalName.TAB_REGISTER);
    this.isNewOrEditCliente = true;
    this.showSaveAndCancel();
    safeCallOrNull(this.selectClient, (it) => {
      setTimeout(() => {
        this.isDisableButtonSave = false;
        this.onItemClick(it.id);
      });
    }, () => {
      setTimeout(() => {
        this.instanceRegisterComponent.notifyChangeItems();
        this.isDisableButtonSave = true;
      });
    });
  }

  private showSaveAndCancel() {
    this.isDisableButtonSave = false;
    this.isDisableButtonCancel = false;
    this.isDisableButtonDelete = true;
    this.isDisableButtonUpdate = true;
    this.isDisableButtonNew = true;
  }

  actionDelete() { }

  onDoubleClickItemTable() {
    this.showSaveAndCancel();
    this.selectedTab.setValue(TabPenalName.TAB_REGISTER);
  }

  onItemClick(id) {
    this.selectedTab.setValue(TabPenalName.TAB_REGISTER);
    this.isDisableButtonCancel = false;
    this.isDisableButtonDelete = false;
    this.isDisableButtonNew = false;
    if (!this.isFetchPerson) {
      this.panelController.fetchPerson(id);
    }
    this.enableForms();
  }

  onItemTableClientSelet(client: any) {
    this.selectClient = client;
    this.isDisableButtonUpdate = false;
    this.isDisableButtonDelete = false;
    this.isFetchPerson = false;
  }

  onLitenerTabEventClick($event) {
    this.selectedTab.setValue($event);

    if (!this.isNewOrEditCliente && this.selectedTab.value == TabPenalName.TAB_REGISTER) {
      safeCall(this.selectClient, (it) => {
        this.showSaveAndCancel();
        this.onItemClick(it.id);
      })
    }
  }

  private cleanFormsAndSelectTabSearch() {
    this.selectedTab.setValue(TabPenalName.TAB_SEARCH);

    this.cleanRegisterForm();
    this.cleanGeneralForm();
    this.cleanSocialNetworkForm();
    this.cleanContactsForm();
    this.cleanReferenciaForm();
    this.cleanAlvaraSanitarioForm();
    this.cleanRegistroArmaForm();
    this.cleanSocietyForm();
    this.cleanObsform();
    this.cleanImagemform();
    this.cleanImagemRegisterform();
    this.cleanGeneralDataForm();
    this.cleanLicenseForm();
    this.instanceRegisterComponent.notifyChangeItems();
  }

  private cleanLicenseForm() {
    withCall(this.licensesForm, (it) => {
      it.form.reset();
      it.form.disable();
      it.licenses = [];
    });
  }

  private cleanImagemform() {
    withCall(this.imageForm, (it) => {
      it.form.reset();
      it.form.disable();
      it.files = [];
      it.formData.delete(`files`);
    });
  }

  private cleanImagemRegisterform() {
    withCall(this.imageRegisterForm, (it) => {
      it.form.reset();
      it.form.disable();
      it.imagesData = [];
      it.form.get(imageRegisterFormNameControlIdDocType).setValue(it.options[0].id);
    });
  }

  private cleanObsform() {
    this.obsGeralForm.form.disable();
    this.obsNefForm.form.disable();
    this.obsPedidoForm.form.disable();
  }

  cleanSocietyForm() {
    this.societyForm.form.disable();
    this.societyForm.society = [];
  }

  private cleanRegistroArmaForm() {
    this.registroArmaForm.form.disable();
  }

  private cleanAlvaraSanitarioForm() {
    this.alvaraSanitarioForm.form.disable();
  }

  private cleanReferenciaForm() {
    this.referenciaForm.form.disable();
  }

  private cleanSocialNetworkForm() {
    this.socialNetworkForm.form.disable();
    this.socialNetworkForm.socialNetwork = [];
  }

  private cleanContactsForm() {
    this.contactsForm.form.disable();
    this.contactsForm.contacts = [];
  }

  private cleanGeneralForm() {
    this.personForm.form.disable();
  }

  private cleanRegisterForm() {
    this.registerForm.form.disable();
  }

  private cleanGeneralDataForm() {
    this.generalDataForm.form.disable();
  }

  private showBtnNew() {
    this.isDisableButtonNew = false;
    this.isDisableButtonSave = true;
    this.isDisableButtonCancel = true;
  }

  private getImageData(): ImageData {
    return {
      formData: this.imageForm.formData,
      form: this.imageForm.form,
      files: this.imageForm.files
    };
  }

  private cleanForms() {
    this.instanceRegisterComponent.clearnTables();
    this.contactsForm.form.reset();
    this.obsGeralForm.form.reset();
    this.obsNefForm.form.reset();
    this.obsPedidoForm.form.reset();
    this.registroArmaForm.form.reset();
    this.alvaraSanitarioForm.form.reset();
    this.referenciaForm.form.reset();
    this.socialNetworkForm.form.reset();
    this.personForm.form.reset();
    this.registerForm.form.reset();
    this.generalDataForm.form.reset();
    this.contactsForm.form.reset();
    this.societyForm.form.reset();
    this.obsGeralForm.form.reset();
    this.obsNefForm.form.reset();
    this.obsPedidoForm.form.reset();
    this.societyForm.form.reset();
    this.registroArmaForm.form.reset();
    this.alvaraSanitarioForm.form.reset();
    this.referenciaForm.form.reset();
    this.socialNetworkForm.form.reset();
    this.licensesForm.form.reset()
    this.registerForm.form.reset();
    this.personForm.form.reset();
  }

  ngOnDestroy() {
//    this.hideLoading();
    this.panelController.cleanForms();
    this.$controllerSubject.unsubscribe();
  }

}

