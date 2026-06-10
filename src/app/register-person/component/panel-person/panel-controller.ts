import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '@base-core/state/state';
import { RegisterPersonUseCase, PersonDataSave } from '@register/domain/usecase/register-use-case.service';
import { PersonForm } from '@register/component/register-person/general-person/person/person-form';
import { RegisterPersonForm } from '@register/component/register-person/general-person/register-person-form';
import { AlvaraSanitarioForm } from '@register/component/register-person/general-person/licencas/alvara-sanitario/alvara-sanitario-form';
import { ClassificacaoForm } from '@register/control-forms/classificacao-form';
import { ContactForm } from '@register/component/register-person/general-person/contacts-person/contacts-form';
import { EmailForm } from '@register/control-forms/email-form';
import { FiscalForm } from '@register/control-forms/fiscal-form';
import { FreteForm } from '@register/control-forms/frete-form';
import { ImageForm } from '@register/component/register-person/general-person/image-register/image-form';
import { ObsGeralForm } from '@register/control-forms/obs-geral-form';
import { ObsNfeForm } from '@register/control-forms/obs-nfe-form';
import { ObsPedidoForm } from '@register/control-forms/obs-pedido-form';
import { SearchPersonForm } from '@register/component/search-person/search-person-form';
import { SocietyForm } from '@register/component/register-person/general-person/sociedade/society-form';
import { PersonUseCase } from '@register/domain/usecase/person-use-case';
import { SocialNetworkForm } from '../register-person/general-person/redes-sociais/social-network-form';
import { ReferenceForm } from '../register-person/general-person/referencia/reference-form';

@Injectable()
export class PanelController {

    private _$panelSubject = new BehaviorSubject<State>({});
    private _$observable = this._$panelSubject.asObservable();


    constructor(
        private regsiterUseCase: RegisterPersonUseCase,
        private personUseCase: PersonUseCase,
        private personForm: PersonForm,
        private registeForm: RegisterPersonForm,
        private alvaraSanitarioForm: AlvaraSanitarioForm,
        private classificationForm: ClassificacaoForm,
        private contactsForm: ContactForm,
        private emailForm: EmailForm,
        private fiscalForm: FiscalForm,
        private freteForm: FreteForm,
        private imageForm: ImageForm,
        private obsGealForm: ObsGeralForm,
        private obsNfeForm: ObsNfeForm,
        private obsPedidoForm: ObsPedidoForm,
        private socialNetworkForm: SocialNetworkForm,
        private referenceForm: ReferenceForm,
        private searchForm: SearchPersonForm,
        private societyForm: SocietyForm
    ) { }

    save(params: PersonDataSave) {
        this.regsiterUseCase.execute(params)
            .subscribe(state => this._$panelSubject.next(state));
    }

    fetchPerson(id: string) {
        this.personUseCase.execute(id)
        .subscribe(state => this._$panelSubject.next(state));
    }

    cleanForms() {
        this.emailForm.form.reset();
        this.fiscalForm.form.reset();
        this.freteForm.form.reset();
        this.imageForm.form.reset();
        this.imageForm.formData = new FormData();
        this.obsGealForm.form.reset();
        this.obsNfeForm.form.reset();
        this.obsPedidoForm.form.reset();
        this.socialNetworkForm.socialNetwork = [];
        this.socialNetworkForm.form.reset();
        this.searchForm.form.reset();
        this.societyForm.society = [];
        this.societyForm.form.reset();
        this.personForm.form.reset();
        this.registeForm.form.reset();
        this.classificationForm.form.reset();
        this.alvaraSanitarioForm.form.reset();
        this.alvaraSanitarioForm.alvaraSanitarios = [];
        this.contactsForm.form.reset();
        this.contactsForm.contacts = [];
        this.referenceForm.form.reset();
        this.referenceForm.form.reset();
    }

    get observable(): Observable<State> {
        return this._$observable;
    }
}
