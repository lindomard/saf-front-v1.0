import { UntypedFormGroup } from '@angular/forms';

export function instanceMarkTouchedForm() {
    return new MarkTouchedForm();
}

export class MarkTouchedForm {
    markedFormControlTouched(form: UntypedFormGroup) {
        // const controls = form.controls;
        // for (const name in controls) {
        //     if (controls[name].invalid) {
        //         console.log(name);
        //     }
        // }
        (<any>Object).values(form.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                this.markedFormControlTouched(control);
            }
        });
    }
}