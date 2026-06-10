import { Client, GeneralData } from '@register/data/model/client.model';
import { General } from '@register/data/model/general.model';
import { Person } from '@register/data/model/person.model';

import { PersonDataSave } from '../usecase/register-use-case.service';
import { instanceContatoMapper } from './contato-mapper';
import { instanceRedeSociaisMapper } from './rede-sociais-mapper';
import { formatDate, formatDateEuaToLong } from '@base-core/format-date';
import { instanceSociedadeMapper } from './sociedade-mapper';
import { GeneralDataEntity } from '../entities/general-data-entity';
import { instanceLicenseMapper } from './license-mapper';

export function registerPersonMapper() {
  return new RegisterPersonMapper();
}

export class RegisterPersonMapper {
  private person: General = {};
  private generalHeader: Person = {};

  private contatoMapper = instanceContatoMapper();
  private redeSocialMapper = instanceRedeSociaisMapper();
  private sociedadeMapper = instanceSociedadeMapper();
  private licenseMapper = instanceLicenseMapper();

  mapFrom(clientDataSave: PersonDataSave): Client {
    this.fillForms(clientDataSave);
    return {
      id: this.generalHeader.id,
      companyName: this.generalHeader.companyName,
      contact: this.generalHeader.contact,
      phone: this.generalHeader.phone,
      situation: this.generalHeader.situation,
      fantasyName: this.person.fantasyName,
      registerDate: formatDate(this.person.registerDate),
      categoryCode: this.person.categoryCode,
      salesman: this.person.salemanCode,
      typePerson: this.person.typePerson,
      cnpj: this.person.cnpj,
      dateOfBid: formatDateEuaToLong(this.person.dateOfBid),
      stateRegistration: this.person.stateRegistration,
      municipalRegistration: this.person.municipalRegistration,
      cnae: this.person.cnae,
      cep: this.person.cep,
      address: this.person.address,
      number: this.person.number,
      complement: this.person.complement,
      condominium: this.person.condominium,
      neighborhood: this.person.neighborhood,
      region: this.person.region,
      cityCode: this.person.cityCode,
      referencePoint: this.person.referencePoint,
      branch: this.person.branchCode,
      country: this.person.country,
      workCard: this.person.workCard,
      rg: this.person.rg,
      company: this.person.company,
      categories: clientDataSave.category,
      contacts: this.contatoMapper.mapFrom(clientDataSave.contacts),
      socialNetwork: this.redeSocialMapper.mapFrom(clientDataSave.socialNetwork),
      licenses: this.licenseMapper.mapFrom(clientDataSave.licenses),
      gunRegistration: clientDataSave.gunRegistration,
      referencePerson: clientDataSave.referencePerson,
      societies: this.sociedadeMapper.mapFrom(clientDataSave.societies),
      uf: this.person.uf,
      email: this.person.email,
      personPhone: this.person.personPhone,
      generalData: this.converterGenalData(clientDataSave.generalDate),
      finalConsumer: this.person.finalConsumer,
      zone: this.person.zone,
      nameCity: this.person.city
    };
  }

  private fillForms(param: PersonDataSave) {
    this.person = param.person.getRawValue();
    this.generalHeader = param.general.getRawValue();
  }

  private converterGenalData(generalEntity: GeneralDataEntity): GeneralData {
    return {
      workCard: generalEntity.workCard,
      cellHusband: generalEntity.cellHusband,
      husband: generalEntity.husband,
      cpfHusband: generalEntity.cpfHusband,
      dateOfBirth: formatDateEuaToLong(generalEntity.dateOfBirth),
      email: generalEntity.email,
      emailHusband: generalEntity.emailHusband,
      company: generalEntity.company,
      workPlaceSpouse: generalEntity.workPlaceSpouse,
      profession: generalEntity.profession,
      rg: generalEntity.rg,
      rgHusband: generalEntity.rgHusband,
      phoneHusband: generalEntity.phoneHusband,
      personalPhone: generalEntity.personalPhone
    }
  }
}
