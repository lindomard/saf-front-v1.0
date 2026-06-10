import { OnInit, ViewChild, Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuildConfig, FormBuildComponent } from 'src/app/base/base-shared/form-build/form-build.component';
import { RegisterPersonForm, registerNameControlSituation, PHONE_REGISTRATION, registerNameControlPhone, INPUT_COMPANY_NAME_REGISTRATION } from './general-person/register-person-form';
import { TabComponent } from '@base-shared/tab/tab.component';
import { TabBarItem } from '@base-shared/tab-bar/tab-bar.component';
import { ContactsPersonComponent } from './general-person/contacts-person/contacts-person.component';
import { SocietyComponent } from './general-person/sociedade/society.component';
import { GeneralPersonComponent, TabGeneralName } from './general-person/general-person.component';
import { safeCall } from '@base-core/safe-call';
import { PersonComponent } from './general-person/person/person.component';
import { changeMaskPhone } from '@base-core/function/change-mask-phone';
import { SocialNetworkComponent } from './general-person/redes-sociais/social-network.component';
import { SocialNetworkEntity } from '@register/domain/entities/social-netwoek-entity.model';
import { ReferenceComponent } from './general-person/referencia/reference.component';
import { LicensesComponent } from './general-person/licencas/licenses.component';
import { ImageRegisterComponent } from './general-person/image-register/image-register.component';
import { ImageRegisterEntity } from '@register/domain/entities/image-register-entity.model';
import { ImageRegisterModel } from '@register/data/model/image-register.model';

export enum TabRegisterName {
  TAB_GENERAL = 0,
  TAB_CONTATO = 1,
  TAB_VENDEDOR = 2,
  TAB_TRANSPORTADORA = 3
}

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPersonComponent implements OnInit {

  @ViewChild('instanceForm', { static: true }) instanceForm: FormBuildComponent;
  @ViewChild('instanceTab', { static: true }) tab: TabComponent;

  @Output() instanceHandleRegister = new EventEmitter<RegisterPersonComponent>();

  instanceGeneralComponent: GeneralPersonComponent;
  instancePersonComponent: PersonComponent;
  instanceContactsComponent: ContactsPersonComponent;
  instanceSocialNetworkComponent: SocialNetworkComponent;
  instanceReferenciaComponente: ReferenceComponent;
  instanceSocietyComponent: SocietyComponent;
  instanceImagemComponet: ImageRegisterComponent;
  instanceLicensesComponent: LicensesComponent;
  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];
  selectedTab = new UntypedFormControl(TabRegisterName.TAB_GENERAL);

  showTabFuncionario = false;
  showTabVendedor = false;
  showTabTransportador = false;

  tabs: TabBarItem[] = [
    { name: 'Geral', show: true },
    { name: 'Funcionário', show: false },
    { name: 'Vendedor', show: false },
    { name: 'Transportadora', show: false },
  ];

  constructor(
    private registerForm: RegisterPersonForm
  ) {
  }

  ngOnInit() {
    this.form = this.registerForm.form;
    this.fields = this.registerForm.fields;
    this.setValueInitSituationsOptions();
    this.instanceHandleRegister.emit(this);
    this.onListenerChangePhone();
    this.onListenerTabEvent();
  }

  clearnTables() {
    this.instancePersonComponent.cleanItemsListGroup();
    this.instanceContactsComponent.cleanContacts();
    this.instanceSocialNetworkComponent.cleanSocialNetWork();
    this.instanceSocietyComponent.cleanSociety();
    this.instanceImagemComponet.removerFiles();
    this.instanceLicensesComponent.cleanLicenses();
    setTimeout(() => {
      this.instanceGeneralComponent.setTab(TabGeneralName.TAB_PESSOA);
    }, 10);

    this.selectedTab.setValue(TabRegisterName.TAB_GENERAL);
  }

  setTypePeson() {
    this.instancePersonComponent.setTypePerson(false);
  }

  setValueInitSituationsOptions() {
    safeCall(this.form, (it) => {
      setTimeout(() => {
        it.get(registerNameControlSituation).setValue(this.registerForm.situationOptions[0].id);
      });
    });
  }

  setSocialNetworks(socialNetwork: SocialNetworkEntity[]) {
    this.instanceSocialNetworkComponent.setSocialNetworks(socialNetwork);
  }

  setContacts(contacts: any[]) {
    this.instanceContactsComponent.setContacts(contacts)
  }

  setLicenses(licenses: any[]) {
    this.instanceLicensesComponent.setLicenses(licenses);
  }

  setSocienties(societies: any[]) {
    this.instanceSocietyComponent.setSocienties(societies);
  }

  setFileData(files: ImageRegisterModel[]) {
    this.instanceImagemComponet.setFileData(files);
  }

  setTab(index: number, generalIndex: number) {
    this.selectedTab.setValue(index);
    this.instanceGeneralComponent.setTab(generalIndex)
  }

  notifyChangeItems() {
    this.instanceSocialNetworkComponent.notifyChangeItemTable();
    this.instanceContactsComponent.notifyDataChange();
    this.instanceLicensesComponent.notifyDataChange();
    this.instanceSocietyComponent.notifyDataChange();
    this.instanceImagemComponet.notifyDataChange();
  }

  private onListenerChangePhone() {
    this.registerForm.handlerChangePhone = () => {
      const phone = this.registerForm.form.get(registerNameControlPhone).value;
      changeMaskPhone(phone, this.instanceForm, this.registerForm.fields, PHONE_REGISTRATION);
    }
  }

  private onListenerTabEvent() {
    this.registerForm.handlerTabEvent = () => {
      this.instancePersonComponent.setFocusType();
    }
  }

  setFocusNameCompany() {
    this.instanceForm.setFocus(INPUT_COMPANY_NAME_REGISTRATION, this.fields);
  }

}
