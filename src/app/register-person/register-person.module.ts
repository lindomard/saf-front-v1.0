import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPersonComponent } from './component/register-person/register-person.component';
import { BaseSharedModule } from '../base/base-shared/base-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPersonComponent } from './component/search-person/search-person.component';
import { PanelPersonComponent } from './component/panel-person/panel-person.component';
import { GeneralPersonComponent } from './component/register-person/general-person/general-person.component';
import { RegisterPersonForm, instanceRegisterPeronForm } from './component/register-person/general-person/register-person-form';
import { PersonForm, instancePersonForm } from './component/register-person/general-person/person/person-form';
import { EmailComponent } from './component/register-person/email/email.component';
import { EmailForm, instanceEmailForm } from './control-forms/email-form';
import { PersonRepository } from './domain/repositories/person-repository';
import { RegisterPersonService } from './data/repositories/person.service';
import { RegisterPersonUseCase } from './domain/usecase/register-use-case.service';
import { ClassificacaoSearchAllUseCase } from './domain/usecase/classificacao/classificacao-search-all-usecase';
import { ClassificacaoDialogComponent } from './component/register-person/dialog/classificacao/classificacao-dialog.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ClassificacaoSearchIdUseCase } from './domain/usecase/classificacao/classificacao-search-id-usecase';
import { ClassificacaoSearchNameUseCase } from './domain/usecase/classificacao/classificacao-search-name-usecase';
import { ClassificationComponent } from './component/register-person/classification/classification.component';
import { ClassificacaoForm, instanceCheckboxForm } from './control-forms/classificacao-form';
import { EmployeeRegisterComponent } from './component/employee-register/employee-register.component';
import { EmployeeForm, instanceEmployeeForm } from './control-forms/employee-form';
import { RegisterContactsComponent } from './component/contacts/register-contacts.component';
import { AddressPersonComponent } from './component/register-person/address-person/address-person.component';
import { CidadeRepository } from './domain/repositories/cidade-repository';
import { CidadeRepositoryService } from './data/repositories/cidade-repository.service';
import { CidadeSearchAllUseCase } from './domain/usecase/cidade/cidade-search-all-usecase';
import { CidadeDialogComponent } from './component/register-person/dialog/cidade/cidade-dialog.component';
import { CidadeSearchNamePageableUseCase } from './domain/usecase/cidade/cidade-search-name-pageable-usecase';
import { CategoriaSearchAllUseCase } from './domain/usecase/categoria/categoria-search-all-usecase';
import { CategoriaRespository } from './domain/repositories/categoria-repository';
import { CategoriaRepositoryService } from './data/repositories/categoria-repository.service';
import { CategoriaSearhNameUseCase } from './domain/usecase/categoria/categoria-search-name-usecase';
import { CategoriaSearchIdUseCase } from './domain/usecase/categoria/categoria-search-id-usecase';
import { CategoriaSearchNivelUseCase } from './domain/usecase/categoria/categoria-search-nivel-usecase';
import { ContactsPersonComponent } from './component/register-person/general-person/contacts-person/contacts-person.component';
import { ContactForm, instanceContactsForm } from './component/register-person/general-person/contacts-person/contacts-form';
import { ContatoRepository } from './domain/repositories/contato-repository';
import { ContatoRepositoryService } from './data/repositories/contato-repository.service';
import { CategoriaCheckDialogComponent } from './component/register-person/dialog/categoria-check/categoria-check-dialog.component';
import { CategoriaDialogComponent } from './component/register-person/dialog/categoria-dialog/categoria-dialog.component';
import { FaturamentoComponent } from './component/register-person/faturamento/faturamento.component';
import { FreteComponent } from './component/register-person/faturamento/frete/frete.component';
import { FinanceiroComponent } from './component/register-person/faturamento/financeiro/financeiro.component';
import { FreteForm, instanceFreteForm } from './control-forms/frete-form';
import { FiscalForm, instanceFiscalForm } from './control-forms/fiscal-form';
import { AlvaraSanitarioComponent } from './component/register-person/general-person/licencas/alvara-sanitario/alvara-sanitario.component';
import { AlvaraSanitarioForm, instanceAlvaraSanitarioForm } from './component/register-person/general-person/licencas/alvara-sanitario/alvara-sanitario-form';
import { RegistroArmaComponent } from './component/register-person/general-person/licencas/registro-arma/registro-arma.component';
import { instanceRegistroArmaForm, RegistroArmaForm } from './control-forms/registro-arma-form';
import { ObservacaoComponent } from './component/register-person/general-person/observacao/observacao.component';
import { GeralComponent } from './component/register-person/general-person/observacao/geral/geral.component';
import { PedidoComponent } from './component/register-person/general-person/observacao/pedido/pedido.component';
import { NfeComponent } from './component/register-person/general-person/observacao/nfe/nfe.component';
import { ObsGeralForm, instanceObsGeralForm } from './control-forms/obs-geral-form';
import { ObsPedidoForm, instanceObsPedidoForm } from './control-forms/obs-pedido-form';
import { instanceObsNfeForm, ObsNfeForm } from './control-forms/obs-nfe-form';
import { CidadeSearchNameUseCase } from './domain/usecase/cidade/cidade-search-name-usecase';
import { ImageSaveUseCase } from './domain/usecase/imagem/image-save-use-case.service';
import { ImageRepository } from './domain/repositories/image-repository';
import { ImageRepositoryService } from './data/repositories/imagem-repository.service';
import { ImageForm } from './component/register-person/general-person/image-register/image-form';
import { ClienteCnpjUseCase } from './domain/usecase/search/cliente-cnpj-usecase';
import { ProgressBarFullComponent } from '@base-shared/progress-bar-full/progress-bar-full.component';
import { ConbrancaEntretaComponent } from './component/register-person/faturamento/conbranca-entreta/conbranca-entreta.component';
import { FiscalComponent } from './component/register-person/faturamento/fiscal/fiscal.component';
import { ControllerSearch } from './component/search-person/controller-search';
import { ClienteEstadoUseCase } from './domain/usecase/search/cliente-estado-usecase';
import { ClienteCidadeUseCase } from './domain/usecase/search/cliente-cidade-usecase';
import { ValidationService } from '@base-core/service/validation.service';
import { ContactsController } from './component/register-person/general-person/contacts-person/contacts-controller';
import { PanelController } from './component/panel-person/panel-controller';
import { ClassificacaoService } from './data/repositories/classifcacao.service';
import { ClassificacaoRepository } from './domain/repositories/classificacao-repository';
import { ViaCepRepository } from './domain/repositories/viacep-repository';
import { ViaCepRepositoryService } from './data/repositories/viacep-repository.service';
import { ViaCepUseCase } from './domain/usecase/viacep/viacep-usecase';
import { CidadeSearchIbgeUseCase } from './domain/usecase/cidade/cidade-search-ibge-usecase';
import { PersonValidCnpjUseCase } from './domain/usecase/search/person-valid-cnpj-usecase';
import { PersonComponent } from './component/register-person/general-person/person/person.component';
import { PersonController } from './component/register-person/general-person/person/person-controller';
import { GeneralDataController } from './component/register-person/general-person/general-data/general-data-controller';
import { GeneralDataComponent } from './component/register-person/general-person/general-data/general-data.component';
import { GeneralDataForm, instanceGeneralDataForm } from './component/register-person/general-person/general-data/general-data-form';
import { LicensesForm, instanceLicenses } from './component/register-person/general-person/licencas/licenses-form';
import { LicensesComponent } from './component/register-person/general-person/licencas/licenses.component';
import { SocietyForm, instanceSocietyForm } from './component/register-person/general-person/sociedade/society-form';
import { SocietyComponent } from './component/register-person/general-person/sociedade/society.component';
import { instanceSearchPersonForm, SearchPersonForm } from './component/search-person/search-person-form';
import { CidadeSearchIdUseCase } from './domain/usecase/cidade/cidade-search-id-usecase';
import { ClientFindUseCase } from './domain/usecase/search/cliente-find-usecase';
import { PersonUseCase } from './domain/usecase/person-use-case';
import { MaskBuilderCnpjOrCpf } from './domain/builder/mask-cnpj-builder';
import { SocialNetworkComponent } from './component/register-person/general-person/redes-sociais/social-network.component';
import { instanceSocialNetworkForm, SocialNetworkForm } from './component/register-person/general-person/redes-sociais/social-network-form';
import { ReferenceComponent } from './component/register-person/general-person/referencia/reference.component';
import { instanceReferenceForm, ReferenceForm } from './component/register-person/general-person/referencia/reference-form';
import { ImageRegisterComponent } from './component/register-person/general-person/image-register/image-register.component';
import { ImageRegisterForm } from './component/register-person/general-person/image-register/image-register-form';
import { ImageRegisterMapper } from './domain/mapper/image-register-mapper';

@NgModule({
  declarations: [
    RegisterPersonComponent,
    SearchPersonComponent,
    PanelPersonComponent,
    GeneralPersonComponent,
    AddressPersonComponent,
    EmailComponent,
    ClassificacaoDialogComponent,
    ClassificationComponent,
    EmployeeRegisterComponent,
    RegisterContactsComponent,
    CidadeDialogComponent,
    CategoriaCheckDialogComponent,
    ContactsPersonComponent,
    CategoriaDialogComponent,
    FaturamentoComponent,
    FreteComponent,
    FinanceiroComponent,
    PersonComponent,
    SocialNetworkComponent,
    ReferenceComponent,
    LicensesComponent,
    AlvaraSanitarioComponent,
    RegistroArmaComponent,
    SocietyComponent,
    ObservacaoComponent,
    GeralComponent,
    PedidoComponent,
    NfeComponent,
    ImageRegisterComponent,
    ConbrancaEntretaComponent,
    FiscalComponent,
    GeneralDataComponent,
  ],
  imports: [
    CommonModule,
    BaseSharedModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  exports: [
    RegisterPersonComponent,
    PanelPersonComponent
  ],
  providers: [
    // contoller
    ControllerSearch,
    PersonController,
    ContactsController,
    PanelController,
    GeneralDataController,

    // forms
    { provide: RegisterPersonForm, useFactory: instanceRegisterPeronForm },
    { provide: PersonForm, useFactory: instancePersonForm, deps: [ValidationService] },
    { provide: EmailForm, useFactory: instanceEmailForm },
    { provide: ClassificacaoForm, useFactory: instanceCheckboxForm },
    { provide: EmployeeForm, useFactory: instanceEmployeeForm },
    { provide: SearchPersonForm, useFactory: instanceSearchPersonForm },
    { provide: ContactForm, useFactory: instanceContactsForm },
    { provide: FiscalForm, useFactory: instanceFiscalForm },
    { provide: FreteForm, useFactory: instanceFreteForm },
    { provide: SocialNetworkForm, useFactory: instanceSocialNetworkForm },
    { provide: ReferenceForm, useFactory: instanceReferenceForm },
    { provide: AlvaraSanitarioForm, useFactory: instanceAlvaraSanitarioForm },
    { provide: RegistroArmaForm, useFactory: instanceRegistroArmaForm },
    { provide: SocietyForm, useFactory: instanceSocietyForm },
    { provide: ObsGeralForm, useFactory: instanceObsGeralForm },
    { provide: ObsPedidoForm, useFactory: instanceObsPedidoForm },
    { provide: ObsNfeForm, useFactory: instanceObsNfeForm },
    { provide: GeneralDataForm, useFactory: instanceGeneralDataForm, deps: [ValidationService] },
    { provide: LicensesForm, useFactory: instanceLicenses },
    ImageRegisterForm,
    ImageForm,
    //builder
    MaskBuilderCnpjOrCpf,

    // usecase
    RegisterPersonUseCase,
    ClassificacaoSearchAllUseCase,
    ClassificacaoSearchIdUseCase,
    ClassificacaoSearchNameUseCase,
    CidadeSearchAllUseCase,
    CidadeSearchNamePageableUseCase,
    CidadeSearchIdUseCase,
    CategoriaSearchAllUseCase,
    CategoriaSearhNameUseCase,
    CategoriaSearchIdUseCase,
    CategoriaSearchNivelUseCase,
    CidadeSearchNameUseCase,
    ImageSaveUseCase,
    ClientFindUseCase,
    ClienteCnpjUseCase,
    ClienteEstadoUseCase,
    ClienteCidadeUseCase,
    ViaCepUseCase,
    CidadeSearchIbgeUseCase,
    PersonValidCnpjUseCase,
    PersonUseCase,

    // mapper
    ImageRegisterMapper,

    // repository
    { provide: PersonRepository, useClass: RegisterPersonService },
    { provide: ClassificacaoRepository, useClass: ClassificacaoService },
    { provide: CidadeRepository, useClass: CidadeRepositoryService },
    { provide: CategoriaRespository, useClass: CategoriaRepositoryService },
    { provide: ContatoRepository, useClass: ContatoRepositoryService },
    { provide: ImageRepository, useClass: ImageRepositoryService },
    { provide: ViaCepRepository, useClass: ViaCepRepositoryService },
  ]
  
})
export class RegisterPersonModule { }
