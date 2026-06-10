import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ContactsPersonComponent } from './contacts-person/contacts-person.component';
import { SocietyComponent } from './sociedade/society.component';
import { PersonComponent } from './person/person.component';
import { SocialNetworkComponent } from './redes-sociais/social-network.component';
import { ReferenceComponent } from './referencia/reference.component';
import { ImageRegisterComponent } from './image-register/image-register.component';

export enum TabGeneralName {
  TAB_PESSOA = 0,
  TAB_REDES_SOCIAIS = 1,
  TAB_CONTATOS = 2,
  TAB_REFERENCE = 3,
  TAB_LICENCA = 4,
  TAB_SOCIENDADE = 5,
  TAB_IMAGE = 6,
}

@Component({
  selector: 'app-general-person',
  templateUrl: './general-person.component.html',
  styleUrls: ['./general-person.component.scss']
})
export class GeneralPersonComponent implements OnInit {

  selectedTab = new UntypedFormControl(TabGeneralName.TAB_PESSOA);

  @Output() instanceHandler = new EventEmitter<GeneralPersonComponent>();
  @Output() instanceHandlePerson = new EventEmitter<PersonComponent>();
  @Output() instanceHandleContacts = new EventEmitter<ContactsPersonComponent>();
  @Output() instanceHandleSocialNetwork = new EventEmitter<SocialNetworkComponent>();
  @Output() instanceReferenciaCliente = new EventEmitter<ReferenceComponent>();
  @Output() instanceSociety = new EventEmitter<SocietyComponent>();
  @Output() instanceImagem = new EventEmitter<ImageRegisterComponent>();
  @Output() instanceLicenses = new EventEmitter<ImageRegisterComponent>();

  @ViewChild('personComponent', { static: true }) personComponent: PersonComponent;

  constructor() {
  }


  ngOnInit() {
    this.instanceHandler.emit(this);
  }

  setTab(index: number) {
    this.selectedTab.setValue(index);
  }

  setIsUpdate(isUpdate: boolean) {
    this.personComponent.isUpdate = isUpdate;
  }

}
