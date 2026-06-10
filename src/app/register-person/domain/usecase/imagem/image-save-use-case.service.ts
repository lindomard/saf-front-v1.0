import { HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { State } from '@base-core/state/state';
import { Usecase } from '@base-core/usecase';
import { ImageRegisterForm } from '@register/component/register-person/general-person/image-register/image-register-form';
import { ImageRegisterMapper } from '@register/domain/mapper/image-register-mapper';
import { ImageRepository } from '@register/domain/repositories/image-repository';
import { ShowImageErrorState, ShowImageSuccessState } from '@register/domain/state/imagem-state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageSaveUseCase implements Usecase<ImageData, State> {

    constructor(
        private imageRepository: ImageRepository,
        private imageRegisterForm: ImageRegisterForm,
        readonly imageMapper: ImageRegisterMapper
    ) { }

    execute(param: ImageData): Observable<State> {
        
        if (param.files.length == 0) {
            return new Observable(obs => {
                obs.next(new ShowImageSuccessState({}));
                obs.complete();
            });
        }

        this.setFormData(param);
        return new Observable(obs => {
            const subject = this.imageRepository.save(param.formData)
                .pipe(
                    map(event => {
                        switch (event.type) {
                            case HttpEventType.UploadProgress:
                                const progress = Math.round(100 * event.loaded / event.total);
                                return { status: 'progress', message: progress };
                            case HttpEventType.Response:
                                return event.body;
                            default:
                                return `Unhandled event: ${event.type}`;
                        }
                    })
                )
                .subscribe(
                    (response) => obs.next(new ShowImageSuccessState(response)),
                    (error) => obs.next(new ShowImageErrorState(error)),
                    () => obs.complete(),
                );
        });
    }

    private setFormData(imageData: ImageData) {
        const values = this.imageRegisterForm.imagesData;
        const imageValue = this.imageMapper.mapFrom(values);
        const data = JSON.stringify(imageValue);

        imageData.formData.append('id', `${imageData.idCliente}`);
        imageData.formData.append('data', data);
    }

}

export interface ImageData {
    formData: FormData;
    form: UntypedFormGroup;
    idCliente?: number;
    files: File[];
}
