import { Injectable } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';

@Injectable()
export class ImageForm {
    private _files: File[] = [];
    private _formData = new FormData();

    constructor() {
        this.form.disable();
    }

    private _form = new UntypedFormGroup({
        files: new UntypedFormControl(null, [Validators.required])
    });

    get files(): File[] {
        return this._files;
    }

    set files(files: File[]) {
        this._files = files;
    }

    get form(): UntypedFormGroup {
        return this._form;
    }

    get formData(): FormData {
        return this._formData;
    }

    set formData(formData: FormData) {
        this._formData = formData;
    }
}