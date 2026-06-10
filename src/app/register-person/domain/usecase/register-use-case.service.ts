import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { Response } from '@base-core/model/response.model';
import { Category } from '@register/data/model/category.model';
import { Client } from '@register/data/model/client.model';
import { ReferencePerson } from '@register/data/model/referencia-cliente.model';
import { RegistroArmas } from '@register/data/model/registro-armas.model';
import { GeneralDataEntity } from "@register/domain/entities/general-data-entity";
import { registerPersonMapper } from '@register/domain/mapper/register-person-maper';
import { PersonRepository } from '@register/domain/repositories/person-repository';
import { ErrorFormRegisterPerson, ErrorRegisterPerson, SuccessSaveResgiter } from '@register/domain/state/register-person-state';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HideLoading, ShowLoading, State } from 'src/app/base/base-core/state/state';
import { Usecase } from 'src/app/base/base-core/usecase';
import { ContatoEntity } from '../entities/contacts-entity.model';
import { LicensesEntity } from '../entities/licenses-entity.model';
import { SocialNetworkEntity } from '../entities/social-netwoek-entity.model';
import { SocietyEntity } from '../entities/sociedade-entity.model';
import { ImageData, ImageSaveUseCase } from './imagem/image-save-use-case.service';
@Injectable()
export class RegisterPersonUseCase implements Usecase<PersonDataSave, State> {

    constructor(
        private registerRepository: PersonRepository,
        private markedTouchedForm: MarkTouchedForm,
        private imageSaveUseCase: ImageSaveUseCase
    ) { }

    private formsRegisterMapper = registerPersonMapper();

    private static getFormDateImage(imageData: ImageData, id: number): ImageData {
        imageData.idCliente = id;
        return imageData;
    }

    execute(clientSave: PersonDataSave): Observable<State> {

        if (clientSave.person.invalid || clientSave.general.invalid) {
            this.markedTouchedForm.markedFormControlTouched(clientSave.person);
            this.markedTouchedForm.markedFormControlTouched(clientSave.general);
            return this.validationForm();
        }

        const client: Client = this.formsRegisterMapper.mapFrom(clientSave);
//lindomar

        return new Observable(obs => {
            obs.next(new ShowLoading());
            const subscriber = this.registerRepository.save(client).pipe(
                mergeMap(res => this.imageSaveUseCase.execute(RegisterPersonUseCase.getFormDateImage(clientSave.imageData, res.id)))
            ).subscribe(
                (response) => {
                    obs.next(new SuccessSaveResgiter((response as Response).success));
                },
                err => {
                    const message = err.message;
                    obs.next(new ErrorRegisterPerson(message || 'Erro ao tentar salvar!'));
                },
                () => {
                    obs.next(new HideLoading());
                    obs.complete();
                }
            );
            return () => {
                obs.next(new HideLoading());
                subscriber.unsubscribe();
            };
        });
    }

    private validationForm(): Observable<State> {
        return new Observable(obs => {
            obs.next(new ErrorFormRegisterPerson('Campos Obrigatórios!'));
            obs.complete();
        });
    }
}

export interface PersonDataSave {
    general: UntypedFormGroup;
    person: UntypedFormGroup;
    category: Category[];
    contacts?: ContatoEntity[];
    socialNetwork?: SocialNetworkEntity[];
    licenses?: LicensesEntity[];
    gunRegistration?: RegistroArmas[];
    referencePerson: ReferencePerson;
    societies?: SocietyEntity[];
    imageData?: ImageData;
    generalDate?: GeneralDataEntity;
}

export interface ClienteSave {
    id: number;
}

